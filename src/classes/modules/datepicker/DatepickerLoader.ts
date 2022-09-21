import {ModuleConfig} from '@/classes/scheme/structure';
import {SmartTimeout} from '@/utils/SmartTimeout';
import {delay} from '@/utils/asinchronius';
import {DatepickerHelper} from './DatepickerHelper';

export class DatepickerLoader {
	lang: string;

	constructor(moduleConfig: ModuleConfig, lang: string) {
		this.lang = DatepickerHelper.getNormalizedLanguage(moduleConfig, lang);
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

	private isLoadedLocales(): boolean {
		if (!this.isLoadedModule()) return false;

		return !!this.getLocales();
	}

	private isLoadedModule(): boolean {
		return !!this.getModule();
	}

	private getModule(): any {
		// @ts-ignore
		return window.Datepicker;
	}

	private getLocales(): object {
		return this.getModule().locales[this.lang];
	}
}
