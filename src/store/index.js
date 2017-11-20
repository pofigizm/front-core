import createHistory from 'history/createBrowserHistory'
import configureStore from './configureStore'

const history = createHistory()
const preloadedState = window.REDUX_STATE

export default (routes, apiRequests) => configureStore(routes, apiRequests, history, preloadedState)
