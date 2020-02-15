const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const Components = require('./components.json')

// 处理路径
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  mode: 'production',
  entry: './src/blocks/basic-form/index.ts',
  output: {
    path: resolve('lib'),
    publicPath: '/lib/',
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // include: [resolve('src')],
        exclude: [
          resolve('node_modules'),
          resolve('dist'),
          resolve('lib')
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [
          resolve('node_modules'),
          resolve('dist'),
          resolve('lib')
        ],
        options: {
          happyPackMode: false,
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(le|sc|sa|c)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ],
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
          fallback: 'file-loader', // 大于阈值 8K 的自动用 file-loader 处理
          name: '[name].[ext]?[hash]',
          outputPath: 'images/',
          publicPath: ''
        }
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@src': resolve('src')
    },
    extensions: ['.ts', '.js', '.vue', '.json']
  }
}
