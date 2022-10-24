// noinspection JSUnresolvedVariable
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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

const config = {
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, '../../dist'),
		filename: 'form-widget-g.js',
	},
	resolve: {extensions: ['.js', '.ts', '.vue']},
	plugins,
	optimization: {
		minimizer,
	},
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

const css = {
	sourceMap: false, // - 31kb
	extract: false,
};

if (process.env.CUSTOM_MODE === 'dev') {
	// если в билде необходима возможность, просматривать файлы стилей
	// корректно, по папкам и файлам раздельно
	css.sourceMap = true; // + 31kb
}

module.exports = {config, css};
