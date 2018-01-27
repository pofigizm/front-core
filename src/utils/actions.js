import { deepAssign } from './lib-helpers'
import { getLocation } from '../selectors'

export const prepareActions = (actions, directory) => {
  const prefix = directory
    .replace(/^node_modules\//, '')
    .replace(/\//g, '-')

  return actions.reduce((acc, action) => ({
    ...acc,
    [action]: `${prefix}-${action}`,
  }), {})
}

export const onRequestSort = fieldName => (dispatch, getState) => {
  const { type, payload, query = {} } = getLocation(getState())
  const q = query.q || {}

  const orderBy = fieldName
  let orderDirection = 'desc'
  if (orderBy === q.orderBy && q.orderDirection === 'desc') {
    orderDirection = 'asc'
  }

  const nextQuery = deepAssign({}, query, { q: { orderBy, orderDirection } })
  dispatch({ type, payload, query: nextQuery })
}

export const onChangeQuery = (field, value) => (dispatch, getState) => {
  const { type, payload, query = {} } = getLocation(getState())

  const nextQuery = deepAssign({}, query, { q: { [field]: value } })
  dispatch({ type, payload, query: nextQuery })
}

export const onChangeFilter = (field, value) => (dispatch) => {
  dispatch(onChangeQuery('filter', { [field]: value }))
}

// deprecated
export default prepareActions
