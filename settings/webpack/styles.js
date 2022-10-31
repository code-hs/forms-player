// noinspection JSUnresolvedFunction, JSUnresolvedVariable

const css = {
	sourceMap: false, // - 31kb
	extract: false,
};

if (process.env.CUSTOM_MODE === 'dev') {
	// если в билде необходима возможность, просматривать файлы стилей
	// корректно, по папкам и файлам раздельно
	css.sourceMap = true; // + 31kb
}

// noinspection FunctionWithMultipleLoopsJS
function enableShadowCss(config) {
	const configs = [
		// Required to explicitly call the __inject__ function exported by
		// vue-style-loader on vue mounting
		// (though the shadow DOM should be created and marked
		//  first by the main js or the style injection will fail)
		config.module.rule('vue').use('vue-loader'),
	];
	const ruleSets = ['css', 'postcss', 'scss', 'sass', 'less', 'stylus'];
	const ruleNames = ['vue-modules', 'vue', 'normal-modules', 'normal'];
	// console.info('**** config.module.rules **** ');
	// console.info(config.module.rules.store.keys());

	ruleSets.forEach(ruleSet => {
		if (config.module.rules.store.has(ruleSet)) {
			// console.info(`**** config.module.rule(${ruleSet}) names: `);
			// console.info(config.module.rule(ruleSet).oneOfs.store.keys());

			ruleNames.forEach(rName => {
				if (config.module.rule(ruleSet).oneOfs.store.has(rName)) {
					// console.info(`**** config.module.rule(${ruleSet}).oneOf(${rName}) uses: `);
					// console.info(config.module.rule(ruleSet).oneOf(rName).uses.store.keys());
					if (
						config.module
							.rule(ruleSet)
							.oneOf(rName)
							.uses.store.has('vue-style-loader')
					) {
						// console.info(`*** vue-style-loader found in rule(${ruleSet}).oneOf(${rName})!`);
						configs.push(
							config.module.rule(ruleSet).oneOf(rName).use('vue-style-loader')
						);
					}
				}
			});
		}
	});
	if (!process.env.BUILD_MODE) {
		process.env.BUILD_MODE = config.store.get('mode');
	}

	configs.forEach(c =>
		c.tap(options => {
			options.shadowMode = true;
			return options;
		})
	);
}

module.exports = {enableShadowCss, css};
