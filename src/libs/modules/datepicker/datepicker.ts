import {ModuleConfig, ValidationParams} from '@/libs/scheme/scheme.types';
import {FieldThis} from '@/libs/components/field/field.types';
import {parseDate} from '@/utils/dateparser';
import {Consts} from '@/config/consts';

type Relations = {
	[langFromAvailableLangs: string]: string;
};
export type FieldOptions = Record<string, any>;

export class DatepickerL {
	static validateFieldParams(fieldThis: FieldThis): void {
		if (!fieldThis.custom.mask) {
			console.warn(
				`InputDate: custom.mask is required, use default mask  ${DatepickerL.getMask('')}`
			);
		}
		if (!fieldThis.moduleData.fieldOptions.format) {
			console.warn(
				`InputDate: format is required. Used default ${DatepickerL.getFormat({})}.
In scheme.config.modules.datepicker.config.forEachField.format or in component [InputDate].module.format`
			);
		}

		if (fieldThis.custom.pattern) {
			throw new Error('DatepickerL.validateFieldParams: pattern cant be used in datepicker');
		}
	}

	static getNormalizedLanguage(moduleConfig: ModuleConfig, lang: string): string {
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
		const format = DatepickerL.getFormat(fieldOptions);
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
		const {minDate, maxDate} = fieldOptions;
		const format = DatepickerL.getFormat(fieldOptions);
		let minTimestamp: number;
		let maxTimestamp: number;

		try {
			minTimestamp = parseDate(minDate, format);
			maxTimestamp = parseDate(maxDate, format);
		} catch {
			console.error('DatepickerL: processRange: not correct format or values in minDate/maxDate');
		}

		// check by min and max dates
		// @ts-ignore
		if (minTimestamp && maxTimestamp) {
			const valid: boolean = DatepickerL.isValidRange(inputTimestamp, minTimestamp, maxTimestamp);
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

	private static getFormat(fieldOptions: FieldOptions): string {
		return fieldOptions.format || Consts.modules.datepicker.defaultValues.format;
	}

	static getMask(mask: string): string {
		return mask || Consts.modules.datepicker.defaultValues.mask;
	}
}
