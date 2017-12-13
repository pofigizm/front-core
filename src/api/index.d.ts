type Fetch = typeof window.fetch

export interface ApiRequest {
  ( method: string, params: any, noUseCache?: boolean): Promise<any>
}

export interface Check {
  (): Promise<string>
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

export const createApiRequest: (config: ConfigItem, option?: Option) => ApiRequest
export const checkToken: (request: ApiRequest) => Check
export const restRequests: (request: ConfigItem) => Fetch
