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
		const {minDate, maxDate, format} = fieldOptions;

		let inputTimestamp: number;
		try {
			inputTimestamp = parseDate(inputValue, format);
		} catch {
			throw new Error(validation.errorTextNotValid);
		}
		if (!inputTimestamp) {
			throw new Error(validation.errorTextNotValid);
		}

		const [minTimestamp, maxTimestamp] = DatepickerHelper.parseRange(
			minDate,
			maxDate,
			format
		);
		if (!minTimestamp || !maxTimestamp) {
			console.error(
				'DatepickerHelper.processValidate: minTimestamp or maxTimestamp is' +
					' undefined'
			);
		}

		const validTimeInRange = DatepickerHelper.isValidRange(
			inputTimestamp,
			minTimestamp,
			maxTimestamp
		);
		if (!validTimeInRange) {
			throw new Error(validation.errorTextRange);
		}
	}

	private static parseRange(minDate: string, maxDate: string, format: string) {
		const minTimestamp: number = parseDate(minDate, format);
		const maxTimestamp: number = parseDate(maxDate, format);

		return [minTimestamp, maxTimestamp];
	}

	private static isValidRange(time: number, min: number, max: number) {
		return time >= min && time <= max;
	}
}
