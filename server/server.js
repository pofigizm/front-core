import fs from 'fs'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import remoteSave from 'remote-save/lib/server'

import paths from '../config/paths'
import webpackConfig from '../config/webpack.config'
import { render } from './render'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const html = render(paths.appSettings)
const handler = (req, res) => {
  res.send(html)
}

const app = express()
const port = 3100

let resultConfig = webpackConfig.default
const appConfig = path.join(paths.appRoot, 'webpack.config.js')
if (fs.existsSync(appConfig)) {
  resultConfig = require(appConfig)(resultConfig)
}
const compiler = webpack(resultConfig)

// api example
const apiMock = path.join(paths.appRoot, 'api-mock.json')
if (fs.existsSync(apiMock)) {
  app.post('/api-mock*', (req, res, next) => {
    req.method = 'GET'
    next()
  })
  app.use('/api-mock*', express.static(apiMock))
}

// remote save
const folder = path.join(paths.appRoot, '.remote-save')
app.use('/remote-save', remoteSave({ folder, extend: true }))

// config
app.use('/config.json', express.static(path.join(paths.appRoot, 'config.json')))

app.use(webpackDevMiddleware(compiler, {
  color: true,
  hot: true,
  noInfo: true,
  publicPath: webpackConfig.default.output.publicPath,
}))
app.use(webpackHotMiddleware(compiler))
app.use(handler)

app.listen(port, (error) => {
  if (error) {
    debug('Error:', error)
  } else {
    debug(`HTTP listen on port:${port}`)
  }
})
