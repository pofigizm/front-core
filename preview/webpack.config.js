/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const config = require('../config/webpack.config').default

module.exports = (storybookBaseConfig) => {
  console.log(JSON.stringify(storybookBaseConfig, null, 2))
  console.log(JSON.stringify(config, null, 2))

  storybookBaseConfig.module = config.module
  storybookBaseConfig.resolve.alias = Object.assign(
    {},
    storybookBaseConfig.resolve.alias,
    config.resolve.alias
  )

  const defs = config.plugins[1].definitions
  Object.keys(defs).forEach((key) => {
    storybookBaseConfig.plugins[2].definitions[key] = defs[key]
  })

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(storybookBaseConfig, null, 2))
  return storybookBaseConfig
}
