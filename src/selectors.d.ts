interface Selector {
  (state: Object): Object
}

export const getState: Selector
export const getLocation: Selector
export const getRoute: Selector

export const getPayload: Selector
export const getQuery: Selector
export const getQObj: Selector
