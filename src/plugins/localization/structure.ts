import {LocalizationConfig} from '@/classes/scheme/structure';

export interface Locales {
	[key: string]: string;
}

/**
 * {
 *		en: {
 *			"app-title": "text en",
 *		},
 *		fr: {
 *			"app-title": "text fr",
 *		}
 * }
 */
export interface LocalesAllLanguages {
	[lang: string]: Locales;
}

export interface LocalizationInformation {
	configuration: LocalizationConfig;
	locales: LocalesAllLanguages;
}
