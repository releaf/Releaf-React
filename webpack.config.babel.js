const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'./src/index.jsx'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.template.html',
			inject: true
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin( {
			filename: 'style.css',
			disable: false,
			allChunks: true
		}),
		// new webpack.ProvidePlugin({
		//     fetch: 'imports?this=>global!exports?global.fetch~whatg-fetch'
		// })
	],
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['react-hot-loader', 'babel-loader']
			},
			{
				test: /\.jsx?$/,
				use: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(css|scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [ {
						loader: "css-loader" // translates CSS into CommonJS
					}, {
						loader: "postcss-loader" // auto-prefixes CSS
					}, {
						loader: "sass-loader" // compiles Sass to CSS
					}],
					publicPath: "/dist"
				})
			},
			{
				test: /\.png?$/,
				use: 'url-loader?limit=100000'
			},
			{
				test: /\.jpg?$/,
				use: 'file-loader'
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				use: 'file-loader'
			}
		]
	}
};
