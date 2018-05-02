import { STORE_KEY } from './constants'
import { create } from 'front-core/src/utils/functions'

export const getState = state => state[STORE_KEY]
export const getDataState = state => getState(state).dataState
export const getEntries = state => getState(state).entries

export const getArrayOfEntries = create(
  getEntries,
  entries => (<any>Object).values(entries),
)
