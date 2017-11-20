require('babel-register')

global.__LOC__ = false
const tmpl = require('./template').default

// eslint-disable-next-line no-console
console.log(tmpl())
