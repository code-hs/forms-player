import {describe, it, expect} from '@jest/globals';
import {
	DatepickerHelper,
	FieldOptions,
} from '@/libs/modules/datepicker/DatepickerHelper';
import {ValidationParams} from '@/libs/scheme/schemeStructure';

describe('DatepickerHelper', () => {
	it('.getNormalizedLanguage', () => {
		const moduleConfig = {
			locales: {
				relations: {
					ua: 'uk',
				},
			},
		};

		const lang1 = DatepickerHelper.getNormalizedLanguage(moduleConfig, 'fr');
		expect(lang1).toBe('fr');

		const lang2 = DatepickerHelper.getNormalizedLanguage(moduleConfig, 'ua');
		expect(lang2).toBe('uk');
	});

	it('.isValidRange, isValidMin, .isValidMax', () => {
		// @ts-ignore
		expect(DatepickerHelper.isValidRange(11, 1, 30)).toBe(true);
		// @ts-ignore
		expect(DatepickerHelper.isValidRange(1, 1, 30)).toBe(true);
		// @ts-ignore
		expect(DatepickerHelper.isValidRange(30, 1, 30)).toBe(true);
		// @ts-ignore
		expect(DatepickerHelper.isValidRange(31, 1, 30)).toBe(false);
		// @ts-ignore
		expect(DatepickerHelper.isValidRange(0, 1, 30)).toBe(false);
	});

	it('.processRange', () => {
		const fieldOptions: FieldOptions = {
			format: 'mm/dd/yyyy',
			minDate: '01/01/1980',
			maxDate: '09/27/2022',
		};
		const validation: ValidationParams = {
			required: true,
			texts: {
				required: '#Date of Birth is required.',
				range:
					'#The date falls outside of the acceptable range. From 01/01/1980 to 09/27/2022',
				notValid: '#This is not a valid date.',
			},
		};
		let inputTimestamp = 1664226000000;

		expect(() => {
			// @ts-ignore
			DatepickerHelper.processRange(fieldOptions, validation, inputTimestamp);
			return true;
		}).toBeTruthy();

		expect(() => {
			inputTimestamp = 11;
			// @ts-ignore
			DatepickerHelper.processRange(fieldOptions, validation, inputTimestamp);
		}).toThrow();

		expect(() => {
			inputTimestamp = 999999999999999;
			// @ts-ignore
			DatepickerHelper.processRange(fieldOptions, validation, inputTimestamp);
		}).toThrow();
	});

	it('.processValidate', () => {
		const fieldOptions: FieldOptions = {
			format: 'mm/dd/yyyy',
			minDate: '01/01/1980',
			maxDate: '09/27/2022',
		};
		const validation: ValidationParams = {
			required: true,
			texts: {
				required: '#Date of Birth is required.',
				range:
					'#The date falls outside of the acceptable range. From 01/01/1980 to 09/27/2022',
				notValid: '#This is not a valid date.',
			},
		};
		let inputValue = '01/01/2022';

		expect(() => {
			DatepickerHelper.processValidate(fieldOptions, validation, inputValue);
			return true;
		}).toBeTruthy();

		expect(() => {
			inputValue = '09/27/2022';
			DatepickerHelper.processValidate(fieldOptions, validation, inputValue);
			return true;
		}).toBeTruthy();

		expect(() => {
			inputValue = '12/28/1979';
			DatepickerHelper.processValidate(fieldOptions, validation, inputValue);
		}).toThrow();

		expect(() => {
			inputValue = '09/28/2022';
			DatepickerHelper.processValidate(fieldOptions, validation, inputValue);
		}).toThrow();
	});
});
