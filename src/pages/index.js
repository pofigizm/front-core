import universal from 'react-universal-component'
import { combineReducers } from 'redux'
import { connect } from 'react-redux'
import { addMiddleware } from 'redux-dynamic-middlewares'

import { createRouteHandler } from 'src/utils/middlewares'
import { getRoute } from 'src/selectors'

export default ({ store, reducers }) => {
  const onLoad = (moduleObject, _, { modulePath }) => {
    const route = (moduleObject.constants || {}).STORE_KEY

    if (moduleObject.middleware) {
      addMiddleware(moduleObject.middleware)
    }

    if (route && moduleObject.reducer) {
      // eslint-disable-next-line no-param-reassign
      reducers[route] = moduleObject.reducer
    }

    if (moduleObject.apiReducers) {
      Object.entries(moduleObject.apiReducers)
        .forEach(([key, reducerFx]) => {
          // eslint-disable-next-line no-param-reassign
          reducers[key] = reducerFx
        })
    }

    const resultReducer = combineReducers({ ...reducers })
    store.replaceReducer(resultReducer)

    if (moduleObject.actions && moduleObject.actions.init) {
      store.dispatch(moduleObject.actions.init())
      addMiddleware(createRouteHandler(modulePath, moduleObject.actions.init))
    }

    // TODO: try to solve this
    // if (__LOC__ && module.hot) {
    //   module.hot.accept('**/reducer.js', () => {
    //     const resultReducer = extendReducer(coreReducer, { [page]: module.reducer })
    //     store.replaceReducer(resultReducer)
    //   })
    // }
  }

  const UniversalComponent = universal(
    (props) => {
      if (props.own) {
        return import(`src/pages/${props.modulePath}`)
      }
      return import(`app-src/pages/${props.modulePath}`)
    },
    { onLoad },
  )

  const mapState = (state) => {
    const { own, modulePath } = getRoute(state)
    return {
      own,
      modulePath,
    }
  }

  return connect(mapState)(UniversalComponent)
}
