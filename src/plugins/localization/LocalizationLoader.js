import {SchemeLoader} from '../../classes/scheme/SchemeLoader';

export class LocalizationLoader {
	/**
	 * @returns {Object}
	 */
	static getData() {
		return {
			configuration: this.getConfiguration(),
			locales: this.getLocales(),
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
	static getLocales() {
		const locales = localStorage.getItem('WDFL:init:locales');
		if (!locales) {
			throw new Error('LocalizationLoader.getLocales: no locales found');
		}

		return JSON.parse(locales);
	}

	/**
	 * @returns {Object}
	 * {
	 *		defaultLang: "en"
	 *		availableLangs: ["en", "fr"]
	 * }
	 */
	static getConfiguration() {
		const scheme = SchemeLoader.getData();

		// is configuration has in scheme
		if (!scheme.config?.localization) {
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
