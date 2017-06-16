const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommonModule = require('./webpack.common');

module.exports = {
	entry: {
		a: "./src/a.js",
		b: "./src/b.js",
		index: './src/main.js'
	},
	output: {
		path: path.resolve(__dirname, '../'+ webpackCommonModule.libraryFolderName),
		filename: "[name].js",
		library: ["[name]"],
		libraryTarget: "umd"
	},
	module: webpackCommonModule.module,
	plugins: [
		new ExtractTextPlugin({
			filename: "static/style.css",
			allChunks: true
		}),// js中分离出css 
	]
};