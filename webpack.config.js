const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const options = {
	devtool:'cheap-source-map'
}

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'bundle.[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
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
                                minimize: true //css压缩
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
                                minimize: true,
                                sourceMap: true
                            }
                }, {
                    loader: "less-loader",
                    options:{
                                minimize: true,
                                sourceMap: true
                            }
                }],
                fallback: "style-loader"
            })
		},


		{ test: /\.png$/, loader: "file-loader" }]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
		}),// 压缩js
		new ExtractTextPlugin('styles.[chunkhash].css'),// js中分离出css
		new HtmlWebpackPlugin({ // 资源导出到html页面
			filename:'index.html',
			template: 'index.html',
			chunks: {
				main:{
					entry: "./src/main.js",

				}
			}
		}),
		new HtmlWebpackPlugin({ // 资源导出到html页面
			filename:'use.html',
			template: 'index.html',
			chunks: {
				main:{
					entry: "./src/b.js",
					output: {filename: '[name].js'}

				}
			}
		})
	]
}