/* eslint-disable no-param-reassign */
const config = require('../config/webpack.config')

module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.resolve.alias = Object.assign(
    {},
    storybookBaseConfig.resolve.alias,
    config.resolve.alias
  )

  const defs = config.plugins[1].definitions
  Object.keys(defs).forEach((key) => {
    storybookBaseConfig.plugins[0].definitions[key] = defs[key]
  })

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(storybookBaseConfig, null, 2))
  return storybookBaseConfig
}
