export const isPlainObject: (value: string) => boolean
export const deepAssign: (target: Object, ...sources: Array<Object>) => Object
export const omit: (keys: Array<string>) => (object: Object) => Object
export const listToHash: (list: Array<Object>, keyName: string, getValue?: Function) => Object
