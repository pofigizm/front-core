import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { connectRoutes } from 'redux-first-router'
import dynamicMiddlewares from 'redux-dynamic-middlewares'

import coreMiddleware from 'src/middleware'
import coreReducer from 'src/reducer'
import options from 'src/pages/options'
import { isDevEnabled } from 'src/flags'

const reducers = { core: coreReducer }

const configureStore = (routes, apiRequests, history, preLoadedState) => {
  const { reducer, middleware, enhancer } = connectRoutes(
    history,
    routes,
    options,
  )
  reducers.location = reducer
  const resultReducer = combineReducers({ ...reducers })

  const middlewareList = [
    thunkMiddleware.withExtraArgument({ ...apiRequests }),
    middleware,
    coreMiddleware,
    dynamicMiddlewares,
  ]

  if (__LOC__) {
    if (isDevEnabled('redux-save')) {
      middlewareList.push(require('src/utils/redux-persist').default)
    }
  }

  const middlewares = applyMiddleware(...middlewareList)
  // eslint-disable-next-line no-underscore-dangle
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  const composeEnhancers = __DEV__ && devTools ? devTools : compose
  const enhancers = composeEnhancers(enhancer, middlewares)
  const store = createStore(resultReducer, preLoadedState, enhancers)

  if (__LOC__ && module.hot) {
    module.hot.accept('src/reducer', () => {
      reducers.core = coreReducer
      const nextResultReducer = combineReducers({ ...reducers })
      store.replaceReducer(nextResultReducer)
    })
  }

  return { store, reducers }
}

export default configureStore
