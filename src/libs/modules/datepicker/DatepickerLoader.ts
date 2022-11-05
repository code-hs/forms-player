import {ModuleConfig} from '@/libs/scheme/schemeStructure';
import {SmartTimeout} from '@/utils/SmartTimeout';
import {delay} from '@/utils/asinchronius';
import {DatepickerHelper} from './DatepickerHelper';

type DatepickerObject = {
	[key: string]: any;
};

export class DatepickerLoader {
	lang: string;

	constructor(moduleConfig: ModuleConfig, lang: string) {
		this.lang = DatepickerHelper.getNormalizedLanguage(moduleConfig, lang);
	}

	async waitLocales(): Promise<void> {
		const smtt = SmartTimeout.createForLoadFile();
		// eslint-disable-next-line no-constant-condition
		while (true) {
			if (this.isLoadedLocales()) return;

			// fallback variant, for stop infinite loop
			if (smtt.totalTime > 3000) {
				console.error('Datepicker: locales not loaded, use default lang');
				return;
			}
			// eslint-disable-next-line no-await-in-loop
			await delay(+smtt);
		}
	}

	private isLoadedLocales(): boolean {
		if (!this.isLoadedModule()) return false;

		return !!this.getLocales();
	}

	private isLoadedModule(): boolean {
		return !!this.getModule();
	}

	getModule(): DatepickerObject {
		// @ts-ignore
		return window.Datepicker;
	}

	private getLocales(): object {
		return this.getModule().locales[this.lang];
	}
}
