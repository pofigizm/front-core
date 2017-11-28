/* eslint-disable function-paren-newline */
const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const paths = require('./paths')

const project = 'front-core'

const str = val => JSON.stringify(val)
const NODE_ENV = process.env.NODE_ENV || 'local'
const env = {
  loc: NODE_ENV === 'local',
  dev: NODE_ENV === 'development',
  prod: NODE_ENV === 'production',
}

module.exports = {
  devtool: !env.prod ? 'eval' : 'source-map',
  entry: {
    core: !env.loc ?
      [
        require.resolve('babel-polyfill'),
        paths.appIndexJs,
      ] :
      [
        require.resolve('babel-polyfill'),
        require.resolve('webpack-hot-middleware/client'),
        require.resolve('react-hot-loader/patch'),
        paths.appIndexJs,
      ],
  },
  output: {
    path: paths.appBuild,
    filename: '[name].js?v=[hash]',
    chunkFilename: '[name].js?v=[hash]',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          cacheDirectory: paths.appCache,
          presets: [
            [require.resolve('babel-preset-pofigizm'), { targets: { chrome: 60 } }],
          ],
        },
        exclude: /node_modules(?!\/front-core)/,
      },
    ],
  },
  resolve: {
    alias: {
      'app-src': paths.appSrc,
      src: paths.ownSrc,
      // for consistent lib
      react: require.resolve('react'),
      classnames: require.resolve('classnames'),
      'react-redux': require.require('react-redux'),
      'redux-first-router-link': require.require('redux-first-router-link'),
    },
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(test.js|test|md)$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: str(NODE_ENV),
      },
      __LOC__: str(env.loc),
      __DEV__: str(!env.prod),
      __PROJECT__: str(project),
      __TEST__: 'false',
    }),
  ]
    // for local
    .concat(
      env.loc ?
        [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
        ] :
        []
    )
    // for production
    .concat(
      env.prod ?
        [
          new webpack.HashedModuleIdsPlugin(),
          new MinifyPlugin(),
        ] :
        []
    ),
  context: paths.appRoot,
  node: {
    __filename: true,
    __dirname: true,
  },
}
