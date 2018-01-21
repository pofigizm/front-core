import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { create } from 'jss'
import preset from 'jss-preset-default'
import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName } from 'material-ui/styles'
import Reboot from 'material-ui/Reboot'

import App from './container'
import getPage from './pages'
import { init } from './actions'
import getStore from './store'
import ownRoutes from './pages/routes'

const generateClassName = createGenerateClassName()
const jss = create(preset())

const render = (Wrapper, Page, store, title, menu) => {
  const root = document.getElementById('app')

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <Reboot>
            <Wrapper title={title} menu={menu} >
              <Page />
            </Wrapper>
          </Reboot>
        </JssProvider>
      </Provider>
    </AppContainer>,
    root,
  )
}

export const root = ({ title, routes, menu, apiRequests, config }) => {
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
