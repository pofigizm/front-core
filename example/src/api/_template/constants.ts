import { prepareActions } from 'front-core/src/utils/actions'

export const STORE_KEY: string = 'apiTemplate'
export const ACTIONS = prepareActions([
  'LIST_STATE',
  'LIST',
], __dirname)
