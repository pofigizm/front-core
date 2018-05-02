const paths = require('../config/paths')

process.argv = process.argv.concat(
  '-p',
  '9002',
  '-c',
  paths.ownPreview,
)

require('@storybook/react/dist/server')
