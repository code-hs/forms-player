import {LocalizationConfig} from '@/libs/scheme/scheme-structure';
import {LocalesAllLanguages, LocalizationInformation} from './structure';
import {SchemeController} from '@/libs/scheme/scheme-controller';

export class LocalizationLoader {
	static getData(): LocalizationInformation {
		return {
			configuration: this.getConfiguration(),
			locales: this.getLocales(),
		};
	}

	private static getLocales(): LocalesAllLanguages | undefined {
		const localesJSON: string | null = localStorage.getItem('WDFL:init:locales');
		if (!localesJSON) {
			console.error('LocalizationLoader.getLocales: no locales found');
			return;
		}

		return JSON.parse(localesJSON);
	}

	private static getConfiguration(): LocalizationConfig | undefined {
		SchemeController.load();
		const configuration: LocalizationConfig | undefined =
			SchemeController.getConfig()?.localization;
		// is configuration has in scheme
		if (!configuration) {
			console.error('LocalizationLoader.getConfiguration: no localization config found in scheme');
			return;
		}

		// is configuration has correct structure
		if (!configuration.defaultLang || !configuration.availableLangs) {
			console.error('LocalizationLoader.getConfiguration: incorrect localization config structure');
			return;
		}

		return configuration;
	}
}
