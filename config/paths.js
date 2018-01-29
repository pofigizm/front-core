const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)

module.exports = {
  appRoot: resolveApp('.'),
  appBuild: resolveApp('build'),
  appIndexJs: resolveApp('src/'), // index.js or index.ts
  appRoutesJs: resolveApp('src/routes'), // routes.js or routes.ts
  appSrc: resolveApp('src'),
  appCache: resolveApp('.cache'),
  appTsConfig: resolveApp('tsconfig.json'),
  appTsLint: resolveApp('tslint.json'),

  ownRoot: resolveOwn('.'),
  ownSrc: resolveOwn('src'),
  ownPreview: resolveOwn('preview'),
}
