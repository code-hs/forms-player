import {describe, it, expect} from '@jest/globals';
import {VirtualComponentHelper} from '@/classes/components/main/VirtualComponentHelper';
import {Field} from '@/classes/scheme/schemeStructure';

describe('VirtualComponentHelper class', () => {
	it('.canInitModel, ifs', () => {
		const allowedComponents = [
			'InputText',
			'InputPassword',
			'InputEmail',
			'Selector',
			'Textarea',
			'Checkbox',
		];
		const fieldType = '1111111';
		const field: Field = {
			common: {type: 'test'},
		};

		const r: boolean = VirtualComponentHelper.canInitModel(
			allowedComponents,
			fieldType,
			field
		);
		expect(r).toBeFalsy();
	});

	it('.canInitModel, ifs', () => {
		const allowedComponents = [
			'InputText',
			'InputPassword',
			'InputEmail',
			'Selector',
			'Textarea',
			'Checkbox',
		];
		const fieldType = 'InputText';
		const field: Field = {
			common: {type: 'test'},
			custom: {
				multi: {
					name: '111',
					key: 333,
				},
			},
		};

		const r: boolean = VirtualComponentHelper.canInitModel(
			allowedComponents,
			fieldType,
			field
		);
		expect(r).toBeFalsy();
	});

	it('.canInitModel, ifs', () => {
		const allowedComponents = [
			'InputText',
			'InputPassword',
			'InputEmail',
			'Selector',
			'Textarea',
			'Checkbox',
		];
		const fieldType = 'InputText';
		const field: Field = {
			common: {model: 'test', type: 'test'},
		};

		const r: boolean = VirtualComponentHelper.canInitModel(
			allowedComponents,
			fieldType,
			field
		);
		expect(r).toBeTruthy();
	});
});
