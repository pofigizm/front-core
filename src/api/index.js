import stringify from 'json-stable-stringify'
import { parseToken, urlEncode } from 'src/utils/helpers'
import { toSnakecase, toCamelcase } from 'src/utils/keyConvert'
import { tokenStorageKey } from 'src/utils/constants'
import { isDevEnabled } from 'src/flags'

const getToken = () => window.localStorage.getItem(tokenStorageKey)
const checkToken = refresh => () => {
  const token = getToken()

  if (__LOC__) return Promise.resolve(token)

  const { error, data } = parseToken(token)

  if (error) {
    // error with parsing token
    window.localStorage.setItem(tokenStorageKey, '')
    return Promise.reject()
  }

  // if token would be expired in 29 seconds
  if ((data.exp * 1000) - Date.now() < (29 * 1000)) {
    return refresh()
      .then(({ result }) => {
        if (!result) return Promise.reject()

        const nextToken = result.idToken
        window.localStorage.setItem(tokenStorageKey, nextToken)
        return nextToken
      })
      .catch(() => {
        window.localStorage.setItem(tokenStorageKey, '')
        return Promise.reject()
      })
  }

  return Promise.resolve(token)
}

const getHeders = () => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  return headers
}

const createApiRequest = (
  { key, url, noCache },
  { check, noKeyConvert, fetch = window.fetch } = {},
) => {
  const coreData = {
    requests: [],
    timer: null,
  }

  const requestRunner = (token) => {
    const raw = coreData.requests
    coreData.requests = []
    coreData.timer = null

    if (raw.length === 0) return true

    const resolves = {}
    const builder = ({ request, resolve }, id) => {
      resolves[id] = resolve
      const props = noKeyConvert ? request : toSnakecase(request)
      return {
        ...props,
        jsonrpc: '2.0',
        id,
      }
    }
    const body = JSON.stringify(raw.map(builder))

    const headers = getHeders()
    headers.append('Authorization', `Bearer ${token}`)

    fetch(url, {
      method: 'POST',
      headers,
      body,
    })
      .then(res => res.json())
      .then(res => res.map(({ error, result, id }) => {
        const cb = resolves[id]
        if (error) return cb({ error })
        if (noKeyConvert) return cb({ result })
        return cb(toCamelcase({ result }))
      }))
      .catch(error => Object.values(resolves).map(r => r({ error })))

    return true
  }

  const requestFunction = (method, params, noUseCache = noCache) => {
    const request = {
      method,
      params,
    }

    if (__LOC__ && isDevEnabled('api-cache')) {
      const req = urlEncode({ url, method, params })
      const prev = JSON.parse(localStorage.getItem('api-cache')) || {}
      const curr = prev[req]
      if (curr && !noUseCache) {
        return Promise.resolve(curr)
      }
    }

    if (!coreData.timer) {
      coreData.timer = setTimeout(() => {
        if (check) {
          return check()
            .then(requestRunner)
            .catch(() => {})
        }
        return requestRunner(getToken())
      }, 50)
    }

    if (__LOC__ && (isDevEnabled('api-cache') || isDevEnabled('api-save'))) {
      return new Promise((resolve) => {
        const saver = ({ error, result }) => {
          if (error) {
            resolve({ error })
            return
          }

          const req = urlEncode({ url, method, params })
          const prev = JSON.parse(localStorage.getItem('api-cache')) || {}
          prev[req] = { result }
          try {
            localStorage.setItem('api-cache', stringify(prev))
          } catch (err) {
            //
          }

          if (isDevEnabled('api-save')) {
            // persist by remote-save
            const sendData = {
              // TODO parametrize it
              params,
              result,
            }
            const client = require('remote-save/lib/client').default
            const saverFx = client({ url: '/remote-save' })
            saverFx(`api-cache-${key}-${method}`, sendData)
          }

          resolve({ result })
        }
        coreData.requests.push({ request, resolve: saver })
      })
    }

    return new Promise((resolve) => {
      coreData.requests.push({ request, resolve })
    })
  }
  return requestFunction
}

export {
  createApiRequest,
  checkToken,
}
export { default as restRequests } from './rest-requests'
