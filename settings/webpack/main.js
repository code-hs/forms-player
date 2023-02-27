// noinspection JSUnresolvedVariable
const webpack = require('webpack');
const path = require('path');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

// noinspection JSUnresolvedFunction,JSUnresolvedVariable
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
	}),
];

if (process.env.CUSTOM_MODE === 'analyze') {
	plugins.push(new BundleAnalyzerPlugin());
}

const configureWebpack = {
	output: {
		path: path.resolve(__dirname, '../../dist'),
		filename: 'form-widget-g.js',
	},
	resolve: {extensions: ['.js', '.ts', '.vue']},
	plugins,
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
};

module.exports = {configureWebpack};
