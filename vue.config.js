const {config, css} = require('./settings/webpack/main');

module.exports = {
	configureWebpack: config,
	filenameHashing: false,
	css,
};
