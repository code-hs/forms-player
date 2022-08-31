import {ModuleOptions} from '@/classes/scheme/structure';

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

export class DatepickerH {
	options: ModuleOptions;
	lang: string;
	relatedLang: string;

	// eslint-disable-next-line no-unused-vars
	constructor(options: ModuleOptions, lang: string) {
		this.options = options;
		this.lang = lang;

		// get lang from relations
		// from UA to UK
		// relatedLang = UK
		this.relatedLang = this.getRelatedLanguage();
	}

	static getModule(): any {
		// @ts-ignore
		return window.Datepicker;
	}

	static isLoadedModule(): boolean {
		return !!this.getModule();
	}

	isLoadedLocales(): boolean {
		if (!DatepickerH.isLoadedModule()) return false;

		return !!this.getLocales();
	}

	setLangInOptions(): void {
		if (!this.options || !this.options.global) {
			console.error(
				'DatepickerH.setLangInOptions: options or options.global is not found'
			);
			return;
		}

		// set lang in options. dirty!
		// this options pass ta the Datepicker constructor
		this.options.global.language = this.relatedLang;
	}

	private getRelatedLanguage(): string {
		const relations: Relations = this.options.locales?.relations || {};

		return relations[this.lang] || this.lang;
	}

	private getLocales(): object {
		return DatepickerH.getModule().locales[this.relatedLang];
	}
}
