export const createRouteHandler = (path, fx) => store => next => (action) => {
  const { payload, routesMap } = store.getState().location
  const { modulePath } = routesMap[action.type] || {}

  if (modulePath === path) {
    if (action.payload !== payload) {
      // do it on next loop
      setTimeout(() => {
        store.dispatch(fx())
      }, 0)
    }
  }
  return next(action)
}
