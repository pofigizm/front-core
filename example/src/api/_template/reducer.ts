/* eslint-disable no-case-declarations */
import { listToHash, deepAssign } from 'front-core/src/utils/lib-helpers'
import { dataStates } from 'front-core/src/utils/constants'

import { ACTIONS } from './constants'

const {
  LIST_STATE,
  LIST,
} = ACTIONS

const initial = {
  dataState: dataStates.notAsked,
  reason: '',
  entries: {},
}

const reducer = (state = initial, action) => {
  switch (action.type) {
    case LIST_STATE:
      return {
        ...state,
        dataState: action.state,
        reason: action.reason,
      }
    case LIST:
      const nextState = deepAssign({}, state, {
        dataState: dataStates.loaded,
        entries: listToHash(action.entries, 'id'),
      })
      return nextState
    default:
      return state
  }
}

export default reducer
