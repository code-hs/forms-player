// noinspection DuplicatedCode

import {describe, it, expect} from '@jest/globals';
import {FieldValidator} from '@/libs/validator/field-validator';
import {ValidationParams} from '@/libs/scheme/scheme.types';

describe('FieldValidator class -> isValid', () => {
	// noinspection DuplicatedCode
	it('full rules, empty value', () => {
		const rules: ValidationParams = {
			required: true,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
		};
		const res: boolean = FieldValidator.isValid(rules, '');
		expect(res).toBeFalsy();
	});

	it('full rules, valid value', () => {
		const rules: ValidationParams = {
			required: true,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
		};
		const res: boolean = FieldValidator.isValid(rules, 'qfu');
		expect(res).toBeTruthy();
	});

	it('full rules, less length', () => {
		const rules: ValidationParams = {
			required: true,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
		};
		const res: boolean = FieldValidator.isValid(rules, 'q');
		expect(res).toBeFalsy();
	});

	it('full rules, bigger length', () => {
		const rules: ValidationParams = {
			required: true,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
		};
		const res: boolean = FieldValidator.isValid(rules, 'so long string');
		expect(res).toBeFalsy();
	});

	it('only required, valid value', () => {
		const rules: ValidationParams = {
			required: true,
		};
		const res: boolean = FieldValidator.isValid(rules, 'q');
		expect(res).toBeTruthy();
	});

	it('only required = false, empty value', () => {
		const rules: ValidationParams = {
			required: true,
		};
		const res: boolean = FieldValidator.isValid(rules, '');
		expect(res).toBeFalsy();
	});

	it('only required = false', () => {
		const rules: ValidationParams = {
			required: false,
		};
		const res: boolean = FieldValidator.isValid(rules, '');
		expect(res).toBeTruthy();
	});

	it('full rules, pattern important, value correct', () => {
		const rules: ValidationParams = {
			required: false,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
		};
		const res: boolean = FieldValidator.isValid(rules, 'qfu');
		expect(res).toBeTruthy();
	});

	it('full rules, pattern important, less value', () => {
		const rules: ValidationParams = {
			required: false,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
		};
		const res: boolean = FieldValidator.isValid(rules, 'q');
		expect(res).toBeFalsy();
	});

	it('empty rules', () => {
		const rules: ValidationParams = {};
		const res: boolean = FieldValidator.isValid(rules, '');

		expect(res).toBeTruthy();
	});

	it('rules = undefined', () => {
		// @ts-ignore
		const rules: ValidationParams = undefined;
		const res: boolean = FieldValidator.isValid(rules, '');

		expect(res).toBeTruthy();
	});
});

describe('FieldValidator class -> canValidation', () => {
	it('rules = null', () => {
		// @ts-ignore
		const rules: ValidationParams = null;
		const res: boolean = FieldValidator.canValidation(rules);

		expect(res).toBeFalsy();
	});

	it('rules = pattern', () => {
		const rules: ValidationParams = {pattern: '/[A-Z]/'};
		const res: boolean = FieldValidator.canValidation(rules);

		expect(res).toBeTruthy();
	});

	it('rules = {pattern, required}', () => {
		const rules: ValidationParams = {pattern: '/[A-Z]/', required: true};
		const res: boolean = FieldValidator.canValidation(rules);

		expect(res).toBeTruthy();
	});

	it('rules = {required}', () => {
		const rules: ValidationParams = {required: true};
		const res: boolean = FieldValidator.canValidation(rules);

		expect(res).toBeTruthy();
	});

	it('rules = {required = false}', () => {
		// if rules only required, and === false -> will not connect field
		const rules: ValidationParams = {required: false};
		const res: boolean = FieldValidator.canValidation(rules);

		expect(res).toBeFalsy();
	});

	it('rules = {required = false}, onlyRequired = true', () => {
		// if rules only required, and === false -> will not connect field
		const rules: ValidationParams = {required: false};
		const res: boolean = FieldValidator.canValidation(rules, true);

		expect(res).toBeFalsy();
	});

	it('rules = {required = true}, onlyRequired = true', () => {
		// if rules only required, and === false -> will not connect field
		const rules: ValidationParams = {required: true};
		const res: boolean = FieldValidator.canValidation(rules, true);

		expect(res).toBeTruthy();
	});
});
