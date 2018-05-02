import { prepareActions } from 'front-core/src/utils/actions'

export const STORE_KEY: string = 'template'
export const ACTIONS = prepareActions([
  'BASE_ACTION',
], __dirname)
