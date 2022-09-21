import {ModuleOptions} from '@/classes/scheme/structure';
import {SmartTimeout} from '@/utils/SmartTimeout';
import {delay} from '@/utils/asinchronius';

type Relations = {
	[langFromAvailableLangs: string]: string;
};

type FieldOptions = {
	[key: string]: any;
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

export class DatepickerLoader {
	options: ModuleOptions;
	lang: string;
	relatedLang: string;

	constructor(options: ModuleOptions, lang: string) {
		this.options = options;
		this.lang = lang;

		// get lang from relations
		// from UA to UK
		// relatedLang = UK
		this.relatedLang = this.getRelatedLanguage();
	}

	async waitLocales() {
		const smtt = SmartTimeout.createForLoadFile();
		// eslint-disable-next-line no-constant-condition
		while (true) {
			if (this.isLoadedLocales()) return;
			if (smtt.totalTime > 3000) {
				console.error('Datepicker: locales not loaded, use default lang');
				return;
			}
			// eslint-disable-next-line no-await-in-loop
			await delay(+smtt);
		}
	}

	setLangInOptions(fieldOptions: FieldOptions): void {
		if (!this.options || !this.options) {
			console.error(
				'DatepickerH.setLangInOptions: options or options.global is not found'
			);
			return;
		}

		// set lang in options. dirty!
		// this options pass to the Datepicker constructor
		fieldOptions.language = this.relatedLang;
	}

	private isLoadedLocales(): boolean {
		if (!this.isLoadedModule()) return false;

		return !!this.getLocales();
	}

	private getModule(): any {
		// @ts-ignore
		return window.Datepicker;
	}

	private isLoadedModule(): boolean {
		return !!this.getModule();
	}

	private getRelatedLanguage(): string {
		const relations: Relations = this.options.locales?.relations || {};

		return relations[this.lang] || this.lang;
	}

	private getLocales(): object {
		return this.getModule().locales[this.relatedLang];
	}
}
