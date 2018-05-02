import { ACTIONS } from './constants'

const {
  BASE_ACTION,
} = ACTIONS

const initial = {
  value: false,
}

const reducer = (state = initial, action) => {
  switch (action.type) {
    case BASE_ACTION:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default reducer
