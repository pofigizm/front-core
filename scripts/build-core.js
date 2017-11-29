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

global.__LOC__ = false
const tmpl = require('../server/template').default

const envFolder = process.env.APP_BUILD_FOLDER
const envPublicPath = process.env.APP_PUBLIC_PATH

const buildFolder = envFolder ? path.resolve(envFolder) : paths.appBuild
fs.emptyDirSync(buildFolder)

fs.outputFileSync(path.join(buildFolder, 'index.html'), tmpl())
fs.copySync(path.join(paths.appRoot, 'config.json'), path.join(buildFolder, 'config.json'))

webpack(config.generate(buildFolder, envPublicPath), (err, stats) => {
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
