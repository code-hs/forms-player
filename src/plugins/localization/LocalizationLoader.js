export class LocalizationLoader {
	/**
	 * @returns {Object}
	 */
	static getData() {
		return {
			configuration: this.getConfiguration(),
			dictionaries: this.getDictionaries(),
		};
	}

	/**
	 * @returns {Object}
	 * {
	 *		en: {
	 *			"app-title": "text en",
	 *		},
	 *		fr: {
	 *			"app-title": "text fr",
	 *		}
	 * }
	 */
	static getDictionaries() {
		const dictionaries = localStorage.getItem('WDFL:init:dictionaries');
		if (!dictionaries) {
			throw new Error(
				'LocalizationLoader.getDictionaries: no dictionaries found'
			);
		}

		return JSON.parse(dictionaries);
	}

	/**
	 * @returns {Object}
	 * {
	 *		defaultLang: "en"
	 *		availableLangs: ["en", "fr"]
	 * }
	 */
	static getConfiguration() {
		let scheme = localStorage.getItem('WDFL:init:scheme');
		if (!scheme) {
			throw new Error('LocalizationLoader.getConfiguration: no scheme found');
		}

		// is configuration has in scheme
		scheme = JSON.parse(scheme);
		if (!scheme.config || !scheme.config.localization) {
			throw new Error(
				'LocalizationLoader.getConfiguration: no localization config found in scheme'
			);
		}

		// is configuration has correct structure
		const configuration = scheme.config.localization;
		if (!configuration.defaultLang || !configuration.availableLangs) {
			throw new Error(
				'LocalizationLoader.getConfiguration: incorrect localization config structure'
			);
		}

		return configuration;
	}
}
