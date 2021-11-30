module.exports = {
	presets: ['@vue/app', '@babel/preset-env'],
	env: {
		test: {
			plugins: ['@babel/plugin-transform-modules-commonjs'],
		},
	},
};
