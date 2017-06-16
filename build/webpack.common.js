// 通用配置
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	debuggerFolderName: 'dist-debugger',
	releaseFolderName: 'dist-release',
	libraryFolderName: 'dist-lib',
	// webpack相关rules
	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets:[['es2015',{modules:false}]],
					plugins:[
						'syntax-dynamic-import',
						'transform-async-to-generator',
	            		'transform-regenerator',
	            		'transform-runtime'
            		]
				}
			}]
		},
		{
			// 处理.css文件
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:[{
                            loader: 'css-loader',
                            options:{
                                minimize: process.env.NODE_ENV && process.env.NODE_ENV == 'release' ? true : false //css压缩
                            }
                        }]
                })
		},
		{
			// 处理.less文件 
			test: /\.less$/i,
			use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader",
                    options:{
                                minimize: process.env.NODE_ENV && process.env.NODE_ENV == 'release' ? true : false,
                                sourceMap: process.env.NODE_ENV && process.env.NODE_ENV == 'release' ? true : false
                            }
                }, {
                    loader: "less-loader",
                    options:{
                                minimize: process.env.NODE_ENV && process.env.NODE_ENV == 'release' ? true : false,
                                sourceMap: process.env.NODE_ENV && process.env.NODE_ENV == 'release' ? true : false
                            }
                }],
                fallback: "style-loader"
            })
		},
		{ 
			test: /\.png$/, 
			loader: "file-loader" 
		}

		// vue相关

		// react相关

		]
	}
}