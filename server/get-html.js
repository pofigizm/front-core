/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

require('babel-register')({
  presets: [require.resolve('babel-preset-pofigizm')],
  ignore: /node_modules(?!\/front-core)/,
})

global.__LOC__ = false
const tmpl = require('./template').default

console.log(tmpl())
