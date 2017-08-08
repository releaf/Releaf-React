const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.babel.js');

const port = 3000;

new WebpackDevServer(webpack(config), {
	historyApiFallback: true,
	hot: true,
	publicPath: config.output.publicPath,
	stats: {
		colors: true
	}
}).listen(port, 'localhost', (err) => {
	if (err) {
		console.log(err);
	}

	console.log(`Listening at localhost:${port}`);
});
