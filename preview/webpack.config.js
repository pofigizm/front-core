/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const config = require('../config/webpack.config').default

module.exports = (storybookBaseConfig) => {
  // console.log(JSON.stringify(storybookBaseConfig, null, 2))
  // console.log(JSON.stringify(config, null, 2))

  storybookBaseConfig.module = config.module
  storybookBaseConfig.resolve = config.resolve

  const defs = config.plugins.find(plugin => plugin.constructor.name === 'DefinePlugin')
  storybookBaseConfig.plugins.forEach((plugin) => {
    if (plugin.constructor.name === 'DefinePlugin') {
      plugin.definitions = { ...plugin.definitions, ...defs.definitions }
    }
  })

  console.log(JSON.stringify(storybookBaseConfig, null, 2))
  return storybookBaseConfig
}
