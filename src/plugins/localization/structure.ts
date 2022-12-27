import {LocalizationConfig} from '@/libs/scheme/scheme-structure';

export interface Locales {
	readonly [key: string]: string;
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
	readonly [lang: string]: Locales;
}

export interface LocalizationInformation {
	readonly configuration?: LocalizationConfig;
	readonly locales?: LocalesAllLanguages;
}
