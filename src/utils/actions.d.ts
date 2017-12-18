export interface PreparedActions {
  [key: string]: string
}

// TODO add redux typings
export interface Action {
  (dispatch?: Function, getState?: Function, option?: Object): void | Promise<any>
}

export const prepareActions: (actions: Array<string>, directory: string) => PreparedActions
export const onRequestSort: (fieldName: string) => Action
export const onChangeQuery: (field: string, value: any) => Action
export const onChangeFilter: (field: string, value: any) => Action
