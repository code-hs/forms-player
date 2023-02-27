const {configureWebpack} = require('./settings/webpack/main');
const {enableShadowCss, css} = require('./settings/webpack/styles');

module.exports = {
	configureWebpack,
	chainWebpack: config => {
		enableShadowCss(config);
	},
	filenameHashing: false,
	css,
	productionSourceMap: false,
};
