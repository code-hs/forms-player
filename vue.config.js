const {configureWebpack} = require('./settings/webpack/main');
const {enableShadowCss, css} = require('./settings/webpack/styles');

module.exports = {
	configureWebpack,
	chainWebpack: config => {
		config.optimization.delete('splitChunks');
		config.optimization.minimize = true;
		enableShadowCss(config);
	},
	filenameHashing: false,
	css,
};
