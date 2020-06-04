const merge = require('webpack-merge');
const common = require('./webpack.common');

const config = {
	mode: 'development'
};

module.exports = merge(common, config)