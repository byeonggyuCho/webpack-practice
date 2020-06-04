const merge = require('webpack-merge');
const common = require('./webpack.common');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


const config = {
    
    plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
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
    mode: 'production',
};


module.exports = merge(common, config)