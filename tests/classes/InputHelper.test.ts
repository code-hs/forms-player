import {describe, it, expect} from '@jest/globals';
import {InputHelper} from '@/libs/components/field/inputs/InputHelper';
import {FieldThis} from '@/libs/components/field/fieldStructure';

describe('Api class', () => {
	it('correct work func initMaskDirty', () => {
		const field: FieldThis = {
			custom: {mask: 'mask value'},
		};
		InputHelper.initMaskDirty(field);
		expect(field.mask).toEqual('mask value');
	});

	it('create error func initMaskDirty', () => {
		expect(() => {
			const field: FieldThis = {
				custom: {mask: 'mask value', pattern: 'pattern value'},
			};
			InputHelper.initMaskDirty(field);
		}).toThrow();
	});

	it('.processTextPatternDirty -> bad value', () => {
		const field: FieldThis = {
			common: {model: 'model1'},
			custom: {
				pattern: '/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/', // email
			},
			modelStore: {model1: ''},
			prevValue: '',
		};

		const event = {target: {value: 'not email string'}};
		// must stay from the prev
		InputHelper.processTextPatternDirty(field, event);
		const currentValue = field.modelStore.model1;
		expect(currentValue).toBe('');
	});

	it('.processTextPatternDirty correct value', () => {
		const field: FieldThis = {
			common: {model: 'model1'},
			custom: {
				pattern: '/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/', // email
			},
			modelStore: {model1: 'nfuy14324a@gmail.com'},
			prevValue: '',
		};
		const event = {target: {value: 'nfuy14324a@gmail.com'}};
		// correct email
		InputHelper.processTextPatternDirty(field, event);
		expect(field.prevValue).toBe('nfuy14324a@gmail.com');
	});

	it('.processTextPatternDirty ifs', () => {
		const field: FieldThis = {
			common: {model: 'model1'},
			custom: {
				pattern: '',
			},
			modelStore: {model1: 'nfuy14324a@gmail.com'},
			prevValue: '',
		};
		const event = {target: {value: 'nfuy14324a@gmail.com'}};
		// correct email
		InputHelper.processTextPatternDirty(field, event);
		expect(field.prevValue).toBe('');
	});

	it('.processTextPatternDirty ifs', () => {
		const field: FieldThis = {
			common: {model: 'model1'},
			custom: {
				pattern: '/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/',
				mask: '123',
			},
			modelStore: {model1: ''},
			prevValue: '',
		};
		const event = {target: {value: 'nfuy14324a@gmail.com'}};
		// correct email
		InputHelper.processTextPatternDirty(field, event);
		expect(field.prevValue).toBe('');
	});
});
