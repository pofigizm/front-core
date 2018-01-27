import { deepAssign } from './utils/lib-helpers'
import { ACTIONS } from './constants'

const {
  TOGGLE_MENU,
  USER,
  CONFIG,
  MESSAGE_ADD,
  MESSAGE_HIDE,
} = ACTIONS

const initial = {
  mainMenuOpen: false,
  config: {},
  user: {},
  messages: {},
}

const reducer = (state = initial, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        mainMenuOpen: !state.mainMenuOpen,
      }
    case USER:
      return {
        ...state,
        user: action.user,
      }
    case CONFIG:
      return {
        ...state,
        config: action.config,
      }
    case MESSAGE_ADD: {
      const messages = deepAssign({}, state.messages, {
        [action.message.id]: action.message,
      })
      return {
        ...state,
        messages,
      }
    }
    case MESSAGE_HIDE: {
      const messages = deepAssign({}, state.messages, {
        [action.id]: {
          ...action.message,
          hide: true,
        },
      })
      return {
        ...state,
        messages,
      }
    }
    default:
      return state
  }
}

export default reducer
