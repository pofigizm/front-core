/* eslint-disable no-underscore-dangle */
import createHistory from 'history/createBrowserHistory'
import configureStore from './configureStore'

const history = createHistory()
const preloadedState = window.__PRELOADED_STATE__

if (preloadedState && preloadedState.location) {
  // need to reload client route
  preloadedState.location.hasSSR = undefined
}

export default (routes, apiRequests) => configureStore(routes, apiRequests, history, preloadedState)
