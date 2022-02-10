import {describe, it, expect} from '@jest/globals';
import {FieldValidator} from '@/classes/validator/FieldValidator';
import {isObject} from '@/utils/objects';

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

describe('FieldValidator class -> flatStructure', () => {
	it('correct work', () => {
		const structure = [
			[
				{
					login: {
						error: false,
					},
					surname: {
						error: false,
					},
				},
			],
			[
				{
					address_1: {
						error: false,
					},
				},
			],
		];

		const array = FieldValidator.flatStructure(structure);
		// [ { error: false }, { error: false }, { error: false } ]

		expect(array.length).toBe(3);
		expect(isObject(array[0])).toBe(true);
		expect(array[0].error).toBe(false);
	});
});

describe('FieldValidator class -> hasStructureErrorInput', () => {
	it('correct work', () => {
		const structure1 = [
			[
				{
					login: {
						error: false,
					},
					surname: {
						error: false,
					},
				},
			],
			[
				{
					address_1: {
						error: false,
					},
				},
			],
		];

		const bStatus1 = FieldValidator.hasStructureErrorInput(structure1);
		expect(bStatus1).toBe(false);

		const structure2 = [
			[
				{
					login: {
						error: true,
					},
					surname: {
						error: false,
					},
				},
			],
			[
				{
					address_1: {
						error: false,
					},
				},
			],
		];

		const bStatus2 = FieldValidator.hasStructureErrorInput(structure2);
		expect(bStatus2).toBe(true);

		const bStatus3 = FieldValidator.hasStructureErrorInput(null);
		expect(bStatus3).toBe(false);
	});
});
