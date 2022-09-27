import {ModuleConfig} from '@/classes/scheme/structure';
import {parseDate} from '@/utils/dateparser';

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

	static processValidate(
		fieldOptions: any,
		inputValue: string,
		validation: any
	) {
		// string
		const {format} = fieldOptions;
		if (!format) return;

		let inputTimestamp: number;
		try {
			inputTimestamp = parseDate(inputValue, format);
		} catch {
			throw new Error(validation.texts.notValid);
		}
		if (!inputTimestamp) {
			throw new Error(validation.texts.notValid);
		}

		this.processRange(fieldOptions, validation, inputTimestamp);
	}

	private static processRange(
		fieldOptions: any,
		validation: any,
		inputTimestamp: number
	): void {
		// string
		const {minDate, maxDate, format} = fieldOptions;
		let minTimestamp: number;
		let maxTimestamp: number;

		try {
			minTimestamp = parseDate(minDate, format);
			maxTimestamp = parseDate(maxDate, format);
		} catch {
			console.error(
				'DatepickerHelper: processRange: not correct format or' +
					' values in minDate/maxDate'
			);
		}

		// @ts-ignore
		if (minTimestamp && maxTimestamp) {
			const valid = DatepickerHelper.isValidRange(
				inputTimestamp,
				minTimestamp,
				maxTimestamp
			);
			if (!valid) throw new Error(validation.texts.range);
			// @ts-ignore
		} else if (minTimestamp) {
			const valid: boolean = this.isValidMin(inputTimestamp, minTimestamp);
			if (!valid) throw new Error(validation.texts.range);
			// @ts-ignore
		} else if (maxTimestamp) {
			const valid: boolean = this.isValidMax(inputTimestamp, maxTimestamp);
			if (!valid) throw new Error(validation.texts.range);
		}
	}

	private static isValidRange(time: number, min: number, max: number) {
		return time >= min && time <= max;
	}

	private static isValidMin(time: number, min: number) {
		return time >= min;
	}

	private static isValidMax(time: number, max: number) {
		return time <= max;
	}
}
