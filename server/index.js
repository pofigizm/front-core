/* eslint-disable no-underscore-dangle */
global.__PROJECT__ = 'front-core'
global.__LOC__ = true
global.__DEV__ = true

require('babel-polyfill')
require('babel-register')
require('./server')
