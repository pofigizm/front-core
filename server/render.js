import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { JssProvider, SheetsRegistry } from 'react-jss'
import { MuiThemeProvider, createGenerateClassName, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import createHistory from 'history/createMemoryHistory'
import csso from 'csso'

import App from '../src/container'
import configureStore from '../src/store/configureStore'
import Loading from '../src/components/loading'
import tmpl from './template'

const history = createHistory({ initialEntries: ['/'] })
const generateClassName = createGenerateClassName()

export const render = (settings) => {
  // TODO render layout wrapper
  const { title, routes, menu, layout = {}, theme } = require(settings)
  const { store } = configureStore(routes, {}, history)

  const sheets = new SheetsRegistry()
  const html = renderToString(
    <AppContainer>
      <Provider store={store}>
        <JssProvider registry={sheets} generateClassName={generateClassName}>
          <CssBaseline>
            <MuiThemeProvider theme={createMuiTheme(theme)} sheetsManager={new Map()}>
              <App title={title} menu={menu} {...layout} >
                <Loading />
              </App>
            </MuiThemeProvider>
          </CssBaseline>
        </JssProvider>
      </Provider>
    </AppContainer>
  )
  const { css } = csso.minify(sheets.toString())
  const stateData = JSON.stringify(store.getState())
  const state = `window.__PRELOADED_STATE__ = ${stateData.replace(/</g, '\\x3c')}`

  return tmpl({ html, css, state })
}
