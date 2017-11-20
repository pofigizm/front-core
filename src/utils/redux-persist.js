import client from 'remote-save/lib/client'

const saver = client({ url: '/remote-save' })

export default () => next => (action) => {
  if (action.type.startsWith('qa-')) {
    // throw out fist and last part of action type
    const postfix = action.type.split('-').slice(1, -1).join('-')
    saver(`reducer-${postfix}`, { [action.type]: action })
  }

  return next(action)
}
