const paths = require('./config/paths')

module.exports = {
  cacheDirectory: '../.cache',
  coverageDirectory: '../.coverage',
  globals: {
    __DEV__: false,
    __LOC__: false,
    __PROJECT__: 'front-core-test',
    __ROOT__: paths.ownRoot,
  },
  modulePaths: [
    '<rootDir>',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/example/',
    '/sctipts/',
  ],
  notify: false,
}
