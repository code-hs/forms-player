const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

// if (process.env.CUSTOM_RUN_COMMAND === 'serve') {
// when run via SERVE (in each file)

const plugins = [
	new webpack.optimize.LimitChunkCountPlugin({
		maxChunks: 1,
	}),
	new webpack.LoaderOptionsPlugin({
		minimize: true,
		debug: false,
	}),
	new webpack.DefinePlugin({
		'process.env.CUSTOM_MODE': JSON.stringify(process.env.CUSTOM_MODE),
		'process.env.CUSTOM_RUN_COMMAND': JSON.stringify(
			process.env.CUSTOM_RUN_COMMAND
		),
	}),
];

let dropConsole = false;

if (process.env.CUSTOM_MODE === 'dev') {
	dropConsole = false;
} else if (process.env.CUSTOM_MODE === 'analyze') {
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
	module: {
		rules: [],
	},
};

module.exports = {configureWebpack};
