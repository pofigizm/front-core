import { dataStates } from 'front-core/src/utils/constants'
import { addMessage } from 'front-core/src/actions'

import { ACTIONS } from './constants'

const {
  LIST_STATE,
  LIST,
} = ACTIONS

const listState = (state, reason) => ({
  type: LIST_STATE,
  state,
  reason,
})

const list = entries => ({
  type: LIST,
  entries,
})

export const getEntry = id => async (dispatch, getState, { requestJsonrpc }) => {
  await dispatch(listState(dataStates.loading, undefined))
  const { error, result } = await requestJsonrpc('Request.Method', { id })

  if (error) {
    await dispatch(listState(dataStates.loading, error))
    await dispatch(addMessage(error.data))
    return { error }
  }

  dispatch(list([result]))
  return result
}
