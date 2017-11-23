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
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000',
            path.resolve(__dirname,source, 'app.js')
        ]
    },
    module:{
        rules:[
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            hash: 'sha512',
                            digest: 'hex',
                            limit: 8192,
                            name: 'images/[name].[ext]'
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
        ]
    },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles/[name].css',
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
