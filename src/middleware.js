import { loginSuccess } from './actions'

const middleware = store => next => (action) => {
  if (action.meta && action.meta.query && action.meta.query.token) {
    setTimeout(() => {
      store.dispatch(loginSuccess())
    }, 0)
  }

  return next(action)
}

export default middleware
