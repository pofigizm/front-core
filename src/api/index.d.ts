type Fetch = typeof window.fetch

export interface ApiRequest {
  ( method: string, params: any, noUseCache?: boolean): Promise<any>
}

export interface Check {
  (): Promise<string>
}

export interface CheckToken {
  (request: ApiRequest): Check
}

export interface ConfigItem {
  key: string
  url: string
  noCache?: boolean
}

export interface Config {
  [key: string]: ConfigItem
}

export interface Option {
  check?: Check
  noKeyConvert?: boolean
  fetch?: Fetch
}

export interface CreateApiRequest {
  (config: ConfigItem, option?: Option): ApiRequest
}

export interface RestRequests {
  (request: ConfigItem): Fetch
}

declare const createApiRequest: CreateApiRequest
declare const checkToken: CheckToken
declare const restRequests: RestRequests

export {
  createApiRequest,
  checkToken,
  restRequests,
}
