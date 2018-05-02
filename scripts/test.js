const jest = require('jest')
const paths = require('../config/paths')

let argv = process.argv.slice(2)
argv = argv.concat(
  '--config',
  paths.jestConfig,
)

jest.run(argv)
