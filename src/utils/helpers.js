import stringify from 'json-stable-stringify'
import queryString from 'query-string'
import match from 'autosuggest-highlight/match'
import { deepAssign } from './lib-helpers'

export const parseToken = (token) => {
  if (!token) return { error: 'token does not exist' }

  const base64Url = token.split('.')[1]
  if (!base64Url) return { error: 'token does not correct' }
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  try {
    return { data: JSON.parse(window.atob(base64)) }
  } catch (error) {
    return { error }
  }
}

export const urlEncode = (obj) => {
  const json = stringify(obj)
  return window.btoa(unescape(encodeURIComponent(json)))
}

export const urlDecode = (base64) => {
  try {
    return JSON.parse(decodeURIComponent(escape(window.atob(base64))))
  } catch (error) {
    return {}
  }
}

export const querySerializer = {
  parse: (string, options) => {
    const object = queryString.parse(string, options)
    if (object.q) {
      object.q = urlDecode(object.q)
    }
    return object
  },
  stringify: (object, options) => {
    const next = { ...object }
    if (next.q && typeof next.q === 'object') {
      next.q = urlEncode(next.q)
    } else {
      delete next.q
    }
    const string = queryString.stringify(next, options)
    return string
  },
  extract: string => queryString.extract(string),
}

export const compareByKey = (key, direction) => (a, b) => {
  if (direction === 'desc') return String(a[key]).localeCompare(String(b[key]))
  if (direction === 'asc') return String(b[key]).localeCompare(String(a[key]))
  return 0
}

export const fuzzySearch = (source = '', target) => {
  if (!target) return true

  const sourceLetters = source.trim().toLowerCase().split('')
  const targetLetters = target.trim().toLowerCase().split('')

  return Boolean(targetLetters
    .reduce((residue, current) => {
      const currentIndex = residue.indexOf(current)
      return currentIndex < 0 ? [] : residue.slice(currentIndex + 1)
    }, sourceLetters.concat(' '))
    .length)
}

export const fuzzySearchInKeys = (keys, target = '', ignore = [], fx = fuzzySearch) => (object) => {
  if (!keys || !keys.length) return true
  if (ignore.includes(object)) return true
  const values = keys.map(key => object[key])
  return values.some(value => fx(value, target))
}

export const hashMap = (hash = {}, fx = a => a) => Object.entries(hash)
  .reduce((acc, [key, value]) => ({
    ...acc,
    [key]: fx(value),
  }), {})

// return boolean
export const matcher = (value) => {
  const parts = value.split(' ').filter(el => el).length
  return el => match(el.label, value).length === parts
}

// return array
export const filterList = (value = '', list = [], selected = [], index = {}) => {
  const selHash = selected
    .reduce((acc, el) => acc.concat(index[el]), [])
    .reduce((acc, el) => ({
      ...acc,
      [el]: true,
    }), {})
  const check = id => (index[id] || []).some(i => selected.includes(i))

  return list
    .filter(el => !selHash[el.id] && !check(el.id))
    .filter(matcher(value))
}

// return boolean
export const findTree = (list = [], selected = [], index = {}) => {
  if (selected === null || selected.length === 0) return true
  if (list === null) return false

  const selHash = list
    .reduce((acc, el) => acc.concat(index[el]), [])
    .reduce((acc, el) => ({
      ...acc,
      [el]: true,
    }), {})

  return selected
    .every(el => selHash[el])
}

// return object
export const makeDeep = (path, value) => {
  if (!path) return {}
  const levels = path.split('.').reverse()
  return levels
    .reduce((acc, key) => ({
      [key]: acc,
    }), value)
}

// return merged object
export const mergeSkipUndef = (condition, first = {}, second = {}, converter = {}) => {
  if (!condition) return first
  return Object.keys(second)
    .reduce((acc, key) => {
      const next = second[key]
      if (typeof next === 'undefined' || next === null) {
        return acc
      }
      if (converter[key]) {
        return deepAssign({}, acc, makeDeep(converter[key], next))
      }
      return { ...acc, [key]: next }
    }, { ...first })
}
