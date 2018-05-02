import { ACTIONS } from './constants'
import { apiExampleActions } from './api'

const {
  BASE_ACTION,
} = ACTIONS

export const baseAction = () => (dispatch) => {
  dispatch({
    type: BASE_ACTION,
  })
}

export const init = () => async (dispatch) => {
  const { error } = await dispatch(apiExampleActions.getEntry(undefined))
  if (error) return null

  return dispatch(baseAction())
}
