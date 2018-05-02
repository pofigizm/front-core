const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)

module.exports = {
  appRoot: resolveApp('.'),
  appBuild: resolveApp('build'),
  appSrc: resolveApp('src'),
  appIndex: resolveApp('src/'), // index.js or index.ts
  appSettings: resolveApp('src/settings'),
  appComponents: resolveApp('src/components'),
  appCache: resolveApp('.cache'),
  appTsConfig: resolveApp('tsconfig.json'),
  appTsLint: resolveApp('tslint.json'),

  ownRoot: resolveOwn('.'),
  ownSrc: resolveOwn('src'),
  ownComponents: resolveOwn('src/components'),
  ownPreview: resolveOwn('preview'),

  jestConfig: resolveOwn('./jest.config.js'),
}
