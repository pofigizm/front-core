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
  getText?: any
  thunk?: any
  role?: boolean
}

export interface Routes {
  [Key: string]: Route
}

export interface Root {
  title?: string
  routes?: Routes
  menu?: Menu
  apiRequests?: any
  config?: any
}

declare const root: (props: Root) => void

export {
  root,
}
