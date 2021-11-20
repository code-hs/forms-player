const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const plugins = [
	new webpack.optimize.LimitChunkCountPlugin({
		maxChunks: 1,
	}),
	new webpack.LoaderOptionsPlugin({
		minimize: true,
		debug: false,
	}),
];

let dropConsole = true;

if (process.env.NODE_MODE === 'dev') {
	dropConsole = false;
} else if (process.env.NODE_MODE === 'analyze') {
	plugins.push(new BundleAnalyzerPlugin());
}

const minimizer = [
	new UglifyJsPlugin({
		uglifyOptions: {
			compress: {
				drop_console: dropConsole,
			},
			output: {
				comments: false,
			},
		},
	}),
];

const configureWebpack = {
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'form-widget-g.js',
	},
	plugins,
	optimization: {
		minimizer,
	},
};

module.exports = {configureWebpack};
