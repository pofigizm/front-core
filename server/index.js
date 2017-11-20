/* eslint-disable no-underscore-dangle */
global.__PROJECT__ = 'front-core'
global.__LOC__ = true
global.__DEV__ = true

require('babel-polyfill')
require('babel-register')({
  presets: [require.resolve('babel-preset-pofigizm')],
  ignore: /node_modules(?!\/front-core)/,
})
require('./server')
