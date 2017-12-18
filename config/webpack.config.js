const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const paths = require('./paths')

const project = 'front-core'

const str = val => JSON.stringify(val)
const NODE_ENV = process.env.NODE_ENV || 'local'
const env = {
  loc: NODE_ENV === 'local',
  dev: NODE_ENV === 'development',
  prod: NODE_ENV === 'production',
  ts: Boolean(process.env.BUILD_TS),
}

const generate = (buildFolder, publicPath = '/') => ({
  devtool: !env.prod ? 'eval' : false,
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
    pathinfo: true,
    path: buildFolder,
    filename: '[name].js?v=[hash]',
    chunkFilename: '[name].js?v=[hash]',
    publicPath,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/front-core)/,
        loader: require.resolve('source-map-loader'),
        enforce: 'pre',
      },
      {
        oneOf: [
          // TODO: is it needed?
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          env.ts && {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules(?!\/front-core)/,
            use: [
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: /node_modules(?!\/front-core)/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              cacheDirectory: paths.appCache,
              presets: [
                [require.resolve('babel-preset-pofigizm'), { targets: { chrome: 60 } }],
              ],
              compact: true,
            },
          },
        ].filter(Boolean),
      },
    ],
  },
  resolve: {
    alias: {
      'app-src': paths.appSrc,
      src: paths.ownSrc,
    },
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
    modules: [
      // for consistent lib
      paths.ownRoot,
      'node_modules',
    ],
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
    env.ts && new ForkTsCheckerWebpackPlugin({
      async: false,
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLint,
    }),
  ].filter(Boolean)
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
})

module.exports = {
  default: generate(paths.appBuild),
  generate,
}
