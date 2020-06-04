const path = require('path')
const HtmlWebpackPlugIn = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry : "./index.js",
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options:{
                    //         injectType: 'singletonStyleTag'
                    //     }
                    // },
                    {
                        loader:MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options:{
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.hbs$/,
                use: ['handlebars-loader']
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:'[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugIn({
            title: 'Hellow Webpack',
            template: './template.hbs',
            meta:{
                viewport:'width-device-width, initial-scale=1.0'
            },
            minify:{
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }

        }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        runtimeChunk:{
            name: 'runtime'
        },
        splitChunks: {
            cacheGroups:{
                commons: {
                    test: /[\\]node_modules[\\]/,
                    name: 'venders',
                    chunks:'all'
                }
            }
        },
        minimize:true,
        minimizer:[
            new TerserWebpackPlugin({
                cache: true
            })
        ]
    },
        

  
    mode: 'none',
}