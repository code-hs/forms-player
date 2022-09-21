import {ModuleConfig} from '@/classes/scheme/structure';

type Relations = {
	[langFromAvailableLangs: string]: string;
};
// "options": {
// 	"locales": {
// 		"relations": {
// 			"ua": "uk",
// 			"en": "en-AU",
// 			"fr": "fr"
// 		}
// 	},
// 	"global": {
// 		"format": "mm/dd/yyyy",
// 		"autohide": true
// 	}
// }

export class DatepickerHelper {
	static getNormalizedLanguage(
		moduleConfig: ModuleConfig,
		lang: string
	): string {
		const relations: Relations = moduleConfig.locales?.relations || {};
		// get lang from relations
		// from UA to UK
		// normalized lang = UK

		return relations[lang] || lang;
	}
}
