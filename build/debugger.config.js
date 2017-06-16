// 调试版本
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommonModule = require('./webpack.common');

module.exports = {
	name: 'debugger',
	entry: './src/main.js',
	output: {
		filename: 'bundle.[chunkhash].js',
		path: path.resolve(__dirname, '../'+ webpackCommonModule.debuggerFolderName +'/static')
	},
	module: webpackCommonModule.module,
	plugins: [
		new ExtractTextPlugin('styles.[chunkhash].css'),// js中分离出css
		new HtmlWebpackPlugin({ 
			// 资源导出到html页面
			filename: path.resolve(__dirname, '../'+ webpackCommonModule.debuggerFolderName +'/index.html'),
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