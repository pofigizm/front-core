import { createApiRequest, checkToken, restRequests } from 'front-core/src/api'
import { Config, ConfigItem, ApiRequest } from 'front-core/src/api/index.d'

interface Hosts {
  [key: string]: string
}

interface ApiRequests {
  [key: string]: ApiRequest
}

interface GetApiRequests {
  (hosts: Hosts): ApiRequests
}

const getApiRequests: GetApiRequests = (hosts) => {
  // TODO more safe (and move to helpers)
  const cfg: Config = Object.keys(hosts)
    .reduce((acc, el) => ({
      ...acc,
      [el]: <ConfigItem> {
        key: el,
        url: hosts[el],
      },
    }), {})

  const requestUser = createApiRequest(cfg.api)
  const refreshToken = () => requestUser('Token.Refresh', null, true)
  const check = checkToken(refreshToken)

  const requestJsonrpc = createApiRequest(cfg.api, { check })
  const requestRest = createApiRequest(cfg.api, { fetch: restRequests(cfg.api) })

  return {
    requestJsonrpc,
    requestRest,
  }
}

export default getApiRequests
