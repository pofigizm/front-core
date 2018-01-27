import { create } from './utils/functions'

const emptyObj = {}

export const getState = state => state.core

export const getLocation = state => state.location || { routesMap: {} }

export const getRoute = create(
  getLocation,
  ({ type, routesMap }) => routesMap[type] || emptyObj,
)

export const getPayload = state => getLocation(state).payload || emptyObj
export const getQuery = state => getLocation(state).query || emptyObj
export const getQObj = state => getQuery(state).q || emptyObj
