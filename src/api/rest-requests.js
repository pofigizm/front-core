const getHeders = () => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  return headers
}

const getOriginWorker = (config, url = '') => ({ method, params, id }) => {
  // TODO: query string cleator
  const [type, path] = method.includes(':') ? method.split(':') : ['GET', method]
  const headers = getHeders()

  let fullUrl
  let body
  if (type === 'GET' && params) {
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
    fullUrl = `${url}/${path}?${query}`
    body = null
  } else {
    fullUrl = `${url}/${path}`
    body = JSON.stringify(params)
  }

  return fetch(fullUrl, {
    method: type,
    headers,
    body,
  })
    .then(res => res.json())
    .then(result => ({
      result,
      jsonrpc: '2.0',
      id,
    }))
}

// substitute original fetch method
const restRequests = config => (url, { body }) => {
  const requests = JSON.parse(body)
  const worker = getOriginWorker(config, url)

  return Promise
    .all(requests.map(worker))
    .then(results => ({
      json: () => results,
    }))
}

export {
  restRequests,
}
