import { parseToken } from 'src/utils/helpers'
import { omit } from 'src/utils/lib-helpers'
import { tokenStorageKey } from 'src/utils/constants'

import { ACTIONS } from './constants'
import { getState as getCore, getLocation } from './selectors'

const {
  TOGGLE_MENU,
  USER,
  CONFIG,
  MESSAGE_ADD,
  MESSAGE_HIDE,
} = ACTIONS

const setUser = user => ({
  type: USER,
  user,
})

const setConfig = config => ({
  type: CONFIG,
  config,
})

const messageAdd = message => ({
  type: MESSAGE_ADD,
  message,
})

const messageHide = id => ({
  type: MESSAGE_HIDE,
  id,
})

export const toggleMenu = () => ({
  type: TOGGLE_MENU,
})

export const userData = (token = window.localStorage.getItem(tokenStorageKey)) => (dispatch) => {
  const { error, data } = token ? parseToken(token) : { error: true }

  if (error) {
    // error with parsing token
    window.localStorage.setItem(tokenStorageKey, '')
    return dispatch(setUser({}))
  }
  return dispatch(setUser(data))
}

export const init = config => (dispatch) => {
  dispatch(setConfig(config))
  window.addEventListener('storage', ({ key, newValue }) => {
    if (key === tokenStorageKey) {
      dispatch(userData(newValue))
    }
  }, false)
  return dispatch(userData())
}

export const loginRequest = () => (dispatch, getState) => {
  const { config } = getCore(getState())
  const { href } = window.location
  const redirect = encodeURIComponent(href)
  const loginUrl = `${config.auth}${redirect}`
  window.location.href = loginUrl
  return true
}

export const loginSuccess = () => (dispatch, getState) => {
  const { type, payload, query } = getLocation(getState())
  const { token } = query
  window.localStorage.setItem(tokenStorageKey, token)
  dispatch(userData(token))

  const nextQuery = omit(['token'])(query)
  dispatch({ type, payload, query: nextQuery })
}

export const addMessage = content => (dispatch) => {
  const id = Date.now().toString()
  const hide = false
  dispatch(messageAdd({ id, hide, content }))

  window.setTimeout(() => {
    dispatch(messageHide(id))
  }, 30000)
}

export const onHideMessage = id => (dispatch) => {
  dispatch(messageHide(id))
}
