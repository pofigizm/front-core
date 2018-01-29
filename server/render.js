import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { JssProvider, SheetsRegistry } from 'react-jss'
import { MuiThemeProvider, createGenerateClassName } from 'material-ui/styles'
import Reboot from 'material-ui/Reboot'
import createHistory from 'history/createMemoryHistory'
import csso from 'csso'

import App from '../src/container'
import configureStore from '../src/store/configureStore'
import Loading from '../src/components/loading'
import tmpl from './template'

const history = createHistory({ initialEntries: ['/'] })
const generateClassName = createGenerateClassName()

export const render = (routesJs) => {
  const { title, routes, menu } = require(routesJs)
  const { store } = configureStore(routes, {}, history)

  const sheets = new SheetsRegistry()
  const html = renderToString(
    <AppContainer>
      <Provider store={store}>
        <JssProvider registry={sheets} generateClassName={generateClassName}>
          <MuiThemeProvider sheetsManager={new Map()}>
            <Reboot>
              <App title={title} menu={menu} >
                <Loading />
              </App>
            </Reboot>
          </MuiThemeProvider>
        </JssProvider>
      </Provider>
    </AppContainer>
  )
  const { css } = csso.minify(sheets.toString())
  const stateData = JSON.stringify(store.getState())
  const state = `window.__PRELOADED_STATE__ = ${stateData.replace(/</g, '\\x3c')}`

  return tmpl({ html, css, state })
}
