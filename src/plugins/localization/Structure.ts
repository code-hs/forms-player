import {LocalizationConfig} from '@/classes/scheme/Structure';

export interface Locales {
	[lang: string]: {
		[localeKey: string]: string;
	};
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

export interface LocalizationInformation {
	configuration: LocalizationConfig;
	locales: Locales;
}
