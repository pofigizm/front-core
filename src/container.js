import { connect } from 'react-redux'

import { compareByKey } from 'src/utils/helpers'
import { memoize } from 'src/utils/functions'

import * as actions from './actions'
import * as selectors from './selectors'

import Index from './components'

const getMessageList = memoize(messages => Object.values(messages)
  .filter(message => !message.hide)
  .sort(compareByKey('id', 'desc')))

const mapState = (state, { title, menu }) => {
  const { user, mainMenuOpen, messages } = selectors.getState(state)
  const messageList = getMessageList(messages)
  const authRequired = selectors.getRoute(state).access && !user.name

  return {
    title,
    menu,
    mainMenuOpen,
    user,
    authRequired,
    messageList,
  }
}

export default connect(mapState, actions)(Index)
