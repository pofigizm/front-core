export const createRouteHandler:
  (path: string, fx: Function) =>
  (store: any) =>
  (next: any) =>
  (action:any) =>
  any
