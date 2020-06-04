const path = require('path')
const HtmlWebpackPlugIn = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webapck = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const isProduction = process.env.NODE_ENV = 'PRODUCTOIN'

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
        new HtmlWebpackPlugIn({
            title: 'Hellow Webpack',
            template: './template.hbs',
            meta:{
                viewport:'width-device-width, initial-scale=1.0'
            },
            minify:isProduction ? {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            } : false

        }),
        new CleanWebpackPlugin(),
        new webapck.DefinePlugin({  // 전역값 설정
            IS_PRODUCTION:true
        })
    ],
}