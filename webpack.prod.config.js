const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config.js')
const path = require('path')
const source = './src'
const dest = './public'
module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              limit: 8192,
              name: 'images/[name].[chunkhash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                optimizationLevel: 7,
                interlaced: false,
                pngquant: {quality: '65-90', speed: 4},
                mozjpeg: {quality: 65, progressive: true},
                gifsicle: {interlaced: true},
                optipng: {optimizationLevel: 7}
              }
            }
          }
        ]
      }
      ]},
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true
    }),
    new CleanWebpackPlugin([ path.resolve(__dirname,dest)]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,source,'html', 'index.html'),
      filename: 'index.html'
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});
