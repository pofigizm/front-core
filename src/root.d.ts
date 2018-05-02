import { ApiRequest } from './api'

export interface MenuItem {
  name: string
  Icon?: any
  link: string
}

export interface Menu {
  [index: number]: MenuItem
}

export interface Route {
  path: string
  modulePath?: string
  getText?: Function
  thunk?: Function
  role?: boolean
}

export interface Routes {
  [Key: string]: Route
}

export interface Layout {
  hideMenu?: boolean
  wrapper?: Function
}

export interface Root {
  title?: string
  routes?: Routes
  menu?: Menu
  layout?: Layout
  apiRequests?: {
    [key: string]: ApiRequest
  }
  config?: Object
}

export const root: (props: Root) => void
