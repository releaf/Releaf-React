const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const entry = ['babel-polyfill', './src/index.jsx'];

// const cssLoaders = [
// 	'autoprefixer?browsers=last 3 versions',
// 	'sass?outputStyle=expanded',
// ];

const plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: './src/index.template.html',
		inject: true
	}),
	new webpack.NoEmitOnErrorsPlugin(),
	new ExtractTextPlugin({
		filename: 'style.css',
		disable: false,
		allChunks: true
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(NODE_ENV),
		},
	}),
	// new webpack.ProvidePlugin({
	// 	fetch: 'imports?this=>global!exports?global.fetch~whatg-fetch'
	// }),
];

if (NODE_ENV !== 'development') {
	plugins.push(new webpack.optimize.UglifyJsPlugin());
	// cssLoaders.unshift('css?minimize&sourceMap');
} else {
	entry.unshift(
		'whatwg-fetch',
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server'
	);
// 	cssLoaders.unshift('css?sourceMap');
// 	cssLoaders.unshift('style');
}

module.exports = {
	devtool: NODE_ENV === 'development' ? 'eval-cheap-module-source-map' : 'source-map',
	entry,
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins,
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
					fallback: 'style-loader',
					// use: NODE_ENV !== 'production' ? cssLoaders.join('!') : ExtractTextPlugin.extract(cssLoaders),
					// loader: NODE_ENV !== 'production' ? cssLoaders.join('!') : ExtractTextPlugin.extract(cssLoaders),
					use: [{
						loader: 'css-loader' // translates CSS into CommonJS
					}, {
						loader: 'postcss-loader' // auto-prefixes CSS
					}, {
						loader: 'sass-loader' // compiles Sass to CSS
					}],
					publicPath: '/dist'
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
