const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const path = require('path')
const source = './src'
const dest = './public'
module.exports = merge(webpackBaseConfig, {
  devtool: '#source-map',
    entry: {
        'scripts/app': [
            'babel-polyfill',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            path.resolve(__dirname,source, 'app.js')
        ]
    },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, source,'html','index.html'),
      filename:'index.html'
    }),
      new webpack.HotModuleReplacementPlugin()
  ]
});
