import {ModuleConfig, ValidationParams} from '@/classes/scheme/structure';
import {parseDate} from '@/utils/dateparser';

type Relations = {
	[langFromAvailableLangs: string]: string;
};
export type FieldOptions = {
	[key: string]: any;
};

export class DatepickerHelper {
	static getNormalizedLanguage(
		moduleConfig: ModuleConfig,
		lang: string
	): string {
		const relations: Relations = moduleConfig.locales?.relations || {};
		// get lang from relations
		// from UA to UK
		// normalized lang = UK
		// set relations in module config

		return relations[lang] || lang;
	}

	static processValidate(
		fieldOptions: FieldOptions,
		validation: ValidationParams,
		inputValue: string
	): void {
		// string
		const {format} = fieldOptions;
		if (!format) return;

		let inputTimestamp: number;
		try {
			inputTimestamp = parseDate(inputValue, format);
		} catch {
			throw new Error(validation.texts?.notValid);
		}

		if (!inputTimestamp) {
			throw new Error(validation.texts?.notValid);
		}

		this.processRange(fieldOptions, validation, inputTimestamp);
	}

	private static processRange(
		fieldOptions: FieldOptions,
		validation: ValidationParams,
		inputTimestamp: number
	): void {
		// prepare min and max rules
		// strings
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

		// check by min and max dates
		// @ts-ignore
		if (minTimestamp && maxTimestamp) {
			const valid: boolean = DatepickerHelper.isValidRange(
				inputTimestamp,
				minTimestamp,
				maxTimestamp
			);
			if (!valid) throw new Error(validation.texts?.range);
			// @ts-ignore
		} else if (minTimestamp) {
			const valid: boolean = this.isValidMin(inputTimestamp, minTimestamp);
			if (!valid) throw new Error(validation.texts?.range);
			// @ts-ignore
		} else if (maxTimestamp) {
			const valid: boolean = this.isValidMax(inputTimestamp, maxTimestamp);
			if (!valid) throw new Error(validation.texts?.range);
		}
	}

	private static isValidRange(time: number, min: number, max: number): boolean {
		return this.isValidMin(time, min) && this.isValidMax(time, max);
	}

	private static isValidMin(time: number, min: number): boolean {
		return time >= min;
	}

	private static isValidMax(time: number, max: number): boolean {
		return time <= max;
	}
}
