import {describe, it, expect} from '@jest/globals';
import {FieldL} from '@/libs/components/field/FieldL';
import {Field} from '@/libs/scheme/schemeStructure';

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
});
