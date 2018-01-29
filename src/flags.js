import { read } from './utils/storage'
import { memoize } from './utils/functions'

const storageKey = 'front-core-flags'
const emptyObj = {}

// TODO may be move to redux store
const state = {
  features: {},
  develop: {
    'api-cache': false,
    'api-save': false,
    'redux-save': false,
  },
}

const localExtend = read(storageKey) || emptyObj

const setFlags = (flags) => {
  Object.entries(flags)
    .forEach(([type, values]) => {
      state[type] = {
        ...state[type],
        ...values,
      }
    })
}

const merge = (obj, extend) => ({ ...obj, ...extend })
const getFeatures = memoize(merge)
const getDevelop = memoize(merge)

const isEnabled = (flag) => {
  if (!__BROWSER__) return false
  const flags = getFeatures(state.features, localExtend.features || emptyObj)
  if (flag in flags) return Boolean(flags[flag])
  return true
}

const isDevEnabled = (flag) => {
  const flags = getDevelop(state.develop, localExtend.develop || emptyObj)
  if (flag in flags) return Boolean(flags[flag])
  return false
}

export default isEnabled
export {
  storageKey,
  state,
  setFlags,
  isEnabled,
  isDevEnabled,
}
