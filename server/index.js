/* eslint-disable no-underscore-dangle */
global.__BROWSER__ = false
global.__DEV__ = true
global.__LOC__ = true
global.__PROJECT__ = 'front-core'

require('babel-polyfill')
require('babel-register')({
  presets: [require.resolve('babel-preset-pofigizm')],
  ignore: /node_modules(?!\/front-core)/,
})
require('./server')
