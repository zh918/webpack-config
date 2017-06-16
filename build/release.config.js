// 正式版本
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommonModule = require('./webpack.common');

module.exports = {
	name: 'release',
	entry: './src/main.js',
	output: {
		filename: 'bundle.[chunkhash].js',
		path: path.resolve(__dirname, '../'+ webpackCommonModule.releaseFolderName +'/static')
	},
	module: webpackCommonModule.module,
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true //options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
		}),// 压缩js
		new ExtractTextPlugin('styles.[chunkhash].css'),// js中分离出css
		new HtmlWebpackPlugin({ 
			// 资源导出到html页面
			filename: path.resolve(__dirname, '../'+ webpackCommonModule.releaseFolderName +'/index.html'),
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