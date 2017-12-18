export const parseToken: (token: string) => Object

export const urlEncode: (obj: Object) => string
export const urlDecode: (base64: string) => Object

interface QuerySerializer {
  parse: (str: string, options?: Object) => Object
  stringify: (str: string, options?: Object) => Object
  extract: (str: string) => Object
}
export const querySerializer: QuerySerializer

interface ArrayFilter {
  (a: Object, b: Object): -1 | 0 | 1
}
export const compareByKey: (key: string, direction: 'asc' | 'desc') => ArrayFilter
export const fuzzySearch: (source: string, target?: string) => boolean
export const fuzzySearchInKeys:
  (keys: Array<string>, target?: string, ignore?: Array<Object>, fx?: Function) => (object: Object) => boolean
export const hashMap: (hash: Object, fx: Function) => Object
export const matcher: (value: string) => boolean
export const filterList:
  (value: string, list: Array<Object>, selected: Array<Object>, index: Object) => Array<Object>
export const findTree: (list: Array<Object>, selected: Array<Object>, index: Object) => boolean
export const makeDeep: (path: string, value: Object) => Object
export const mergeSkipUndef:
  (condition: boolean, first: Object, second: Object, converter: Object) => Object
