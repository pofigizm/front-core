import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import App from './container'
import getPage from './pages'
import { init } from './actions'
import getStore from './store'
import ownRoutes from './pages/routes'

const render = (Wrapper, Page, store, title, menu) => {
  const root = document.getElementById('app')

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Wrapper title={title} menu={menu} >
          <Page />
        </Wrapper>
      </Provider>
    </AppContainer>,
    root,
  )
}

// eslint-disable-next-line object-curly-newline
export default ({ title, routes, menu, apiRequests, config }) => {
  const { store, reducers } = getStore({ ...ownRoutes, ...routes }, apiRequests)
  store.dispatch(init(config))

  const Page = getPage({ store, reducers })
  render(App, Page, store, title, menu)

  if (__LOC__ && module.hot) {
    module.hot.accept('./pages', () => {
      const getNextPage = require('./pages').default
      const NextPage = getNextPage({ store, reducers })
      render(App, NextPage, store, title, menu)
    })
  }
}
