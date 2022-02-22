import {describe, it, expect} from '@jest/globals';
import {FieldValidator} from '@/classes/validator/FieldValidator';

describe('FieldValidator class -> isValid', () => {
	it('full rules, empty value', () => {
		const res = FieldValidator.isValid(
			{
				required: true,
				pattern: '/^[a-z0-9_-]{2,6}$/i',
			},
			''
		);
		expect(res).toBeFalsy();
	});

	it('full rules, valid value', () => {
		const res = FieldValidator.isValid(
			{
				required: true,
				pattern: '/^[a-z0-9_-]{2,6}$/i',
			},
			'qfu'
		);
		expect(res).toBeTruthy();
	});

	it('full rules, less length', () => {
		const res = FieldValidator.isValid(
			{
				required: true,
				pattern: '/^[a-z0-9_-]{2,6}$/i',
			},
			'q'
		);
		expect(res).toBeFalsy();
	});

	it('full rules, bigger length', () => {
		const res = FieldValidator.isValid(
			{
				required: true,
				pattern: '/^[a-z0-9_-]{2,6}$/i',
			},
			'so long string'
		);
		expect(res).toBeFalsy();
	});

	it('only required, valid value', () => {
		const res = FieldValidator.isValid(
			{
				required: true,
			},
			'q'
		);
		expect(res).toBeTruthy();
	});

	it('only required = false, empty value', () => {
		const res = FieldValidator.isValid(
			{
				required: true,
			},
			''
		);
		expect(res).toBeFalsy();
	});

	it('only required = false', () => {
		const res = FieldValidator.isValid(
			{
				required: false,
			},
			''
		);
		expect(res).toBeTruthy();
	});

	it('full rules, pattern important, value correct', () => {
		const res = FieldValidator.isValid(
			{
				required: false,
				pattern: '/^[a-z0-9_-]{2,6}$/i',
			},
			'qfu'
		);
		expect(res).toBeTruthy();
	});

	it('full rules, pattern important, less value', () => {
		const res = FieldValidator.isValid(
			{
				required: false,
				pattern: '/^[a-z0-9_-]{2,6}$/i',
			},
			'q'
		);
		expect(res).toBeFalsy();
	});

	it('empty rules', () => {
		const res = FieldValidator.isValid({}, '');
		expect(res).toBeTruthy();
	});

	it('rules = undefined', () => {
		const res = FieldValidator.isValid(undefined, '');
		expect(res).toBeTruthy();
	});
});
