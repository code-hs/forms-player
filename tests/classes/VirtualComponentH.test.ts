import {describe, it, expect} from '@jest/globals';
import {VirtualComponentH} from '@/classes/components/main/VirtualComponentH';
import {Field} from '@/classes/scheme/structure';

describe('VirtualComponentH class', () => {
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
		const field: Field = {};

		const r: boolean = VirtualComponentH.canInitModel(
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
			custom: {
				multi: {
					name: '111',
				},
			},
		};

		const r: boolean = VirtualComponentH.canInitModel(
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
			common: {model: 'test'},
		};

		const r: boolean = VirtualComponentH.canInitModel(
			allowedComponents,
			fieldType,
			field
		);
		expect(r).toBeTruthy();
	});
});
