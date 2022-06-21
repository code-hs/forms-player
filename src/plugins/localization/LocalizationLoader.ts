import {Scheme, LocalizationConfig} from '@/classes/scheme/Structure';
import {SchemeLoader} from '@/classes/scheme/SchemeLoader';
import {Locales, LocalizationInformation} from './Structure';

export class LocalizationLoader {
	static getData(): LocalizationInformation {
		return {
			configuration: this.getConfiguration(),
			locales: this.getLocales(),
		};
	}

	private static getLocales(): Locales {
		const localesJSON: string | null =
			localStorage.getItem('WDFL:init:locales');
		if (!localesJSON) {
			throw new Error('LocalizationLoader.getLocales: no locales found');
		}

		return JSON.parse(localesJSON);
	}

	private static getConfiguration(): LocalizationConfig {
		const scheme: Scheme = SchemeLoader.getData();

		// is configuration has in scheme
		if (!scheme.config?.localization) {
			throw new Error(
				'LocalizationLoader.getConfiguration: no localization config found in scheme'
			);
		}

		// is configuration has correct structure
		const configuration: LocalizationConfig = scheme.config.localization;

		if (!configuration.defaultLang || !configuration.availableLangs) {
			throw new Error(
				'LocalizationLoader.getConfiguration: incorrect localization config structure'
			);
		}

		return configuration;
	}
}
