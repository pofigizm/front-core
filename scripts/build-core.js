/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const config = require('../config/webpack.config')
const paths = require('../config/paths')

require('babel-register')({
  presets: [require.resolve('babel-preset-pofigizm')],
  ignore: /node_modules(?!\/front-core)/,
})

global.__BROWSER__ = false
global.__DEV__ = false
global.__LOC__ = false
global.__PROJECT__ = 'front-core'
const { render } = require('../server/render')

const envFolder = process.env.APP_BUILD_FOLDER
const envPublicPath = process.env.APP_PUBLIC_PATH

const buildFolder = envFolder ? path.resolve(envFolder) : paths.appBuild
fs.emptyDirSync(buildFolder)

fs.outputFileSync(path.join(buildFolder, 'index.html'), render(paths.appRoutesJs))
fs.copySync(path.join(paths.appRoot, 'config.json'), path.join(buildFolder, 'config.json'))

let webpackConfig = config.generate(buildFolder, envPublicPath)
const appConfig = path.join(paths.appRoot, 'webpack.config.js')
if (fs.existsSync(appConfig)) {
  webpackConfig = require(appConfig)(webpackConfig, webpack)
}

webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  const jsonStats = stats.toJson()

  if (jsonStats.errors.length > 0) {
    console.error(jsonStats.errors)
    process.exit(1)
  }

  if (jsonStats.warnings.length > 0) {
    console.error(jsonStats.warnings)
  }

  fs.writeJsonSync(path.join(buildFolder, 'stats.json'), jsonStats)
  console.log('Success!')
})
