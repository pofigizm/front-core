window.qa = window.qa || {}
const { qa } = window

qa.cacheExpire = 10 * 60 * 1000 // ten minutes

export default prop => qa[prop]
