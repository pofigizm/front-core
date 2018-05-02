import { connect } from 'react-redux'
import { NavLink } from 'redux-first-router-link'

import { compareByKey } from './utils/helpers'
import { memoize } from './utils/functions'
import App from './components/app'

import * as actions from './actions'
import * as selectors from './selectors'

const getMessageList = memoize(messages => Object.values(messages)
  .filter(message => !message.hide)
  .sort(compareByKey('id', 'desc')))

const mapState = (state, ownProps) => {
  const { user, mainMenuOpen, messages } = selectors.getState(state)
  const messageList = getMessageList(messages)
  const authRequired = selectors.getRoute(state).role && !user.name

  return {
    ...ownProps,
    mainMenuOpen,
    user,
    authRequired,
    messageList,
    NavLink,
  }
}

export default connect(mapState, actions)(App)
export const createContainer = Component => connect(mapState, actions)(Component)
