const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugIn = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const postcssloader = {
	loader: 'postcss-loader',
	options: {
		config: {
			path: 'postcss.config.js'
		}
	}
};

const isProduction = process.env.NODE_ENV = 'PRODUCTION'

module.exports = {
    entry : "./src/index.js",
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                oneOf: [
                    {
                        test:/\.moudle\.s?css$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    modules:true
                                }
                            },
                            postcssloader,
                            {
                                loader:'sass-loader'
                            }
                        ]
                    }, {
                        use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        postcssloader,
                        'sass-loader'
                        ]
                    }
                ]
            },
            {
                test: /\.hbs$/,
                use: ['handlebars-loader']
            },
            {
                test:/\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(file){
                                if(!isProduction)
                                    return '[path][name].[ext]';
                                else
                                    return '[contenthash].[ext]'
                            },
                            publicPath: 'images/',
                            outputPath: 'images/'
                        },
                       
                    }
                ],
            },
            {
                test: /\.bmp$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            limit: 8192 //파일크기에 대한 제한 가능.(약8kb)
                        }
                    }
                ]
            },{
                test: /.js/,
                exclude: /node_module/,
                loader: 'babel-loader'
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
        new webpack.DefinePlugin({  // 전역값 설정
            IS_PRODUCTION:isProduction
        })
    ],
}