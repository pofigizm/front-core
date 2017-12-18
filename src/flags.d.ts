interface FlagGroup {
  [key: string]: boolean
}
interface Flags {
  features: FlagGroup
  develop: FlagGroup
}

export const storageKey: string
export const state: Flags
export const setFlags: (flags: Flags) => void
export const isEnabled: (flag: string) => boolean
export const isDevEnabled: (flag:string) => boolean
