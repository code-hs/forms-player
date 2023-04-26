// noinspection DuplicatedCode

import {describe, it, expect} from '@jest/globals';
import {FieldValidator} from '@/libs/validator/field-validator';
import type {ErrorKey} from '@/libs/validator/types';
import type {ValidationParams} from '@/libs/scheme/scheme.types';

describe('FieldValidator class -> isValid', () => {
	// noinspection DuplicatedCode
	it('full rules, empty value', () => {
		const rules: ValidationParams = {
			required: true,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
			texts: {
				required: '#errors.required',
				pattern: '#error.pattern',
			},
		};
		const res: ErrorKey = FieldValidator.validate(rules, '');
		expect(res).toBe('#errors.required');
	});

	it('full rules, valid value', () => {
		const rules: ValidationParams = {
			required: true,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
		};
		const res: ErrorKey = FieldValidator.validate(rules, 'qfu');
		expect(res).toBe('');
	});

	it('full rules, less length', () => {
		const rules: ValidationParams = {
			required: true,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
			texts: {
				required: '#errors.required',
				pattern: '#error.pattern',
			},
		};
		const res: ErrorKey = FieldValidator.validate(rules, 'q');
		expect(res).toBe('#error.pattern');
	});

	it('full rules, bigger length', () => {
		const rules: ValidationParams = {
			required: true,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
			texts: {
				required: '#errors.required',
				pattern: '#error.pattern',
			},
		};
		const res: ErrorKey = FieldValidator.validate(rules, 'so long string');
		expect(res).toBe('#error.pattern');
	});

	it('only required, valid value', () => {
		const rules: ValidationParams = {
			required: true,
		};
		const res: ErrorKey = FieldValidator.validate(rules, 'q');
		expect(res).toBe('');
	});

	it('only required, empty value, without error text', () => {
		const rules: ValidationParams = {
			required: true,
		};
		const res: ErrorKey = FieldValidator.validate(rules, '');
		expect(res).toBe(' ');
	});

	it('only pattern, not correct, without error text', () => {
		const rules: ValidationParams = {
			required: true,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
		};
		const res: ErrorKey = FieldValidator.validate(rules, 'so long string');
		expect(res).toBe(' ');
	});

	it('only required = false, empty value', () => {
		const rules: ValidationParams = {
			required: true,
			texts: {
				required: '#errors.required',
				pattern: '#error.pattern',
			},
		};
		const res: ErrorKey = FieldValidator.validate(rules, '');
		expect(res).toBe('#errors.required');
	});

	it('only required = false', () => {
		const rules: ValidationParams = {
			required: false,
		};
		const res: ErrorKey = FieldValidator.validate(rules, '');
		expect(res).toBe('');
	});

	it('full rules, pattern important, value correct', () => {
		const rules: ValidationParams = {
			required: false,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
		};
		const res: ErrorKey = FieldValidator.validate(rules, 'qfu');
		expect(res).toBe('');
	});

	it('full rules, pattern important, less value', () => {
		const rules: ValidationParams = {
			required: false,
			pattern: '/^[a-z0-9_-]{2,6}$/i',
			texts: {
				required: '#errors.required',
				pattern: '#error.pattern',
			},
		};
		const res: ErrorKey = FieldValidator.validate(rules, 'q');
		expect(res).toBe('#error.pattern');
	});

	it('empty rules', () => {
		const rules: ValidationParams = {};
		const res: ErrorKey = FieldValidator.validate(rules, '');

		expect(res).toBe('');
	});

	it('rules = undefined', () => {
		// @ts-ignore
		const rules: ValidationParams = undefined;
		const res: ErrorKey = FieldValidator.validate(rules, '');

		expect(res).toBe('');
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
