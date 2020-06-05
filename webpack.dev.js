const merge = require('webpack-merge');
const common = require('./webpack.common');
const StyleLintPlugin = require('stylelint-webpack-plugin')

const config = {
	mode: 'development',
	
 	devServer :{
		open:true,	// 탭 오픈
		overlay: true,	// error 메세지가 브라우저에 나온다.
		port: 3000,
		historyApiFallback:{	
			rewrites: [// 라우팅 지원이 안되는 곳으로 이동했을때  index페이지로 이동함.
					{ from:/^\subpage$/, to:'subpage.html'},
				{ from:/./, to:'404.html'}
			]
		}
	
	},	
	plugins: [
		new StyleLintPlugin()
	]

};

module.exports = merge(common, config)