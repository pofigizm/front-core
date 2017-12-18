import { Action } from './utils/actions'

export const toggleMenu: () => Object
export const userData: (token: string) => Action
export const init: (config: Object) => Action
export const loginRequest: () => Action
export const loginSuccess: () => Action
export const addMessage: (content: string) => Action
export const onHideMessage: (id: number) => Action
