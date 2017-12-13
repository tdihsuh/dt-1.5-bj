const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const source = './src'
const dest = './public'
module.exports = {

    // 输出配置
    output: {
        path: path.resolve(__dirname, dest),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.json', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                include: [
                    path.resolve(__dirname, source)
                ],
                use: [
                    {
                        loader: 'json-loader'
                    }
                ]
            },
            {
                test: /\.(js)$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-2'],
                        plugins: ['transform-decorators-legacy', 'transform-runtime'],
                        cacheDirectory: true
                    }
                }],
                include: [path.resolve(__dirname, source)],
                exclude: /node_modules/
            },
            {
                test: /\.(vue)$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                less: ExtractTextPlugin.extract({
                                    use: ['css-loader?minimize', 'postcss-loader', 'less-loader'],
                                    fallback: 'vue-style-loader'
                                }),
                                css: ExtractTextPlugin.extract({
                                    use: ['css-loader', 'postcss-loader', 'less-loader'],
                                    fallback: 'vue-style-loader'
                                })
                            }
                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: true
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname, source)
                ]
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, source),
                    path.resolve(__dirname, 'node_modules')
                ],
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'postcss-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'postcss-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            minetype: 'application/font-woff',
                            name: 'fonts/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {loader: 'url-loader'}
                ]
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),

        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "scripts/vendor",
            minChunks: function (module) {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "scripts/manifest",
            minChunks: Infinity
        }),
        new webpack.BannerPlugin('Copyright @ UNICC Frontend'),
        /*new CopyWebpackPlugin([{from: './images/', to: 'images'},
          {from: './favicon.ico', to: 'favicon.ico'}]),*/
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
