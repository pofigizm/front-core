const getHeders = () => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  return headers
}

const getOriginWorker = (config, url) => ({ method, params, id }) => {
  // TODO: query string cleator
  const query = Object.entries(params || {})
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  const fullUrl = `${url}/${method}?${query}`
  const headers = getHeders()

  return fetch(fullUrl, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(result => ({
      result,
      jsonrpc: '2.0',
      id,
    }))
}

// substitute original fetch method
const legacyRequests = config => (url, { body }) => {
  const requests = JSON.parse(body)
  const worker = getOriginWorker(config, url)

  return Promise
    .all(requests.map(worker))
    .then(results => ({
      json: () => results,
    }))
}

export default legacyRequests
