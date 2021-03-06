/* eslint-disable no-param-reassign */
import mapObj from 'map-obj'
import camelcase from 'camelcase'
import decamelize from 'decamelize'
import QuickLru from 'quick-lru'

const base = { deep: true }
const has = (arr, key) => arr.some(x => (typeof x === 'string' ? x === key : x.test(key)))

const walker = (method, cache) => (input, loc) => {
  const opts = Object.assign({}, base, loc)

  return mapObj(input, (key, val) => {
    if (!(opts.exclude && has(opts.exclude, key))) {
      if (cache.has(key)) {
        key = cache.get(key)
      } else {
        const ret = method(key)

        if (key.length < 100) {
          cache.set(key, ret)
        }

        key = ret
      }
    }

    return [key, val]
  }, { deep: opts.deep })
}

export const toCamelcase = walker(camelcase, new QuickLru({ maxSize: 50000 }))
export const toSnakecase = walker(decamelize, new QuickLru({ maxSize: 50000 }))
