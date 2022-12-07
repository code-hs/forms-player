import {describe, expect, it} from '@jest/globals';
import {FieldL} from '@/libs/components/field/field';
import {Field} from '@/libs/scheme/scheme-structure';
import {SchemeController} from '@/libs/scheme/scheme-controller';

describe('FieldL class', () => {
	it('correct work func getMultiName', () => {
		const field1: Field = {
			common: {
				type: 'test',
			},
			custom: {
				multi: {
					name: 'test',
					key: 123,
				},
			},
		};
		const r1 = FieldL.getMultiName(field1);
		expect(r1).toBe('test');

		// @ts-ignore
		const field2: Field = {
			custom: {
				// @ts-ignore
				multi: {},
			},
		};
		const r2 = FieldL.getMultiName(field2);
		expect(r2).toBe('');

		// @ts-ignore
		const field3: Field = {
			custom: {},
		};
		const r3 = FieldL.getMultiName(field3);
		expect(r3).toBe('');
		// @ts-ignore
		const field4: Field = {};
		const r4 = FieldL.getMultiName(field4);
		expect(r4).toBe('');
	});

	// @ts-ignore
	SchemeController.scheme = {
		config: {
			variables: {
				selectorCountryList: {
					ua: '#Ukraine',
					ru: '#Russian Federation',
					usa: '#United States',
					me: '#Montenegro',
				},
			},
		},
	};

	it('.variabling. error', () => {
		expect(() => {
			FieldL.variabling('$:test');
		}).toThrow();
	});

	it('.variabling. correct 1', () => {
		const list = FieldL.variabling('$:selectorCountryList');
		expect(list.ua).toBe('#Ukraine');
	});

	it('.variabling. correct 2', () => {
		// @ts-ignore
		const item = FieldL.variabling(123);
		expect(item).toBe(123);
	});

	it('.variabling. correct 3', () => {
		// @ts-ignore
		const item = FieldL.variabling('123');
		expect(item).toBe('123');
	});
});
