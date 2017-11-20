
// import { compare } from 'src/utils/debugHelpers'
//   shouldComponentUpdate(next) {
//     return compare(this.props, next, debug || console.log)
//   }

export const compare = (curr, next, debug) => {
  if (curr === next) return false
  const wrong = Object.keys(next)
    .filter((key) => {
      if (next[key] !== curr[key]) {
        debug('--- wrong ---', key, next[key], curr[key])
        return true
      }
      return false
    })
  return Boolean(wrong.length)
}
