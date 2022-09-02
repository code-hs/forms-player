import {Scheme, LocalizationConfig} from '@/classes/scheme/structure';
import {SchemeLoader} from '@/classes/scheme/SchemeLoader';
import {Locales, LocalizationInformation} from './structure';

export class LocalizationLoader {
	static getData(): LocalizationInformation {
		return {
			configuration: this.getConfiguration(),
			locales: this.getLocales(),
		};
	}

	private static getLocales(): Locales | undefined {
		const localesJSON: string | null =
			localStorage.getItem('WDFL:init:locales');
		if (!localesJSON) {
			console.error('LocalizationLoader.getLocales: no locales found');
			return;
		}

		return JSON.parse(localesJSON);
	}

	private static getConfiguration(): LocalizationConfig {
		const scheme: Scheme = SchemeLoader.getData();

		// is configuration has in scheme
		if (!scheme.config?.localization) {
			console.error(
				'LocalizationLoader.getConfiguration: no localization config found in scheme'
			);
			return;
		}

		// is configuration has correct structure
		const configuration: LocalizationConfig = scheme.config.localization;

		if (!configuration.defaultLang || !configuration.availableLangs) {
			console.error(
				'LocalizationLoader.getConfiguration: incorrect localization config structure'
			);
			return;
		}

		return configuration;
	}
}
