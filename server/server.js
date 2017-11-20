import fs from 'fs'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import remoteSave from 'remote-save/lib/server'

import tmpl from './template'
import paths from '../config/paths'
import webpackConfig from '../config/webpack.config'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const handler = (req, res) => {
  res.send(tmpl())
}

const app = express()
const port = 3100

const compiler = webpack(webpackConfig)

// api example
const apiMock = path.join(paths.appRoot, 'api-mock.json')
if (fs.existsSync(apiMock)) {
  app.use('/api-mock', express.static(apiMock))
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
  publicPath: webpackConfig.output.publicPath,
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
