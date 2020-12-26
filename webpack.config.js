const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  // 默认配置，无需写
  // entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash:8].js',
    path: resolve('dist'),
  },
  devtool: 'source-map', // 调试的时候可以快速找到错误代码
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: resolve('public/index.html') }),
    new ESLintPlugin(),
  ],
  devServer: { open: 'chrome' },
}
