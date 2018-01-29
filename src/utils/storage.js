import stringify from 'json-stable-stringify'
import { deepAssign } from './lib-helpers'

export const read = (key) => {
  let content = {}
  try {
    content = JSON.parse(window.localStorage.getItem(key)) || {}
  } catch (_) {
    //
  }

  return content
}

export const write = (key, data) => {
  window.localStorage.setItem(key, stringify(data))
}

export const extend = (key, data) => {
  const prev = read(key)
  const next = {
    ...prev,
    ...data,
  }
  write(key, next)
}

export const deepExtend = (key, data) => {
  const prev = read(key)
  const next = deepAssign({}, prev, data)
  write(key, next)
}
