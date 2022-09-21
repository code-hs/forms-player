import {describe, it, expect} from '@jest/globals';
import {SchemeController} from '@/classes/scheme/SchemeController';
import {ModuleController} from '@/classes/modules/ModuleController';

describe('InitModule class', () => {
	// @ts-ignore
	SchemeController.scheme = {
		config: {
			modules: [
				{
					name: 'auth',
					enable: false,
					options: {
						global: {
							foo: 111,
						},
					},
				},
			],
		},
		pages: [
			{
				key: 'welcome_1',
				components: [
					{
						common: {
							type: 'InputText',
							model: 'address_1',
						},
					},
					{
						common: {
							type: 'InputText',
							model: 'address_2',
							enable: true,
						},
						components: [
							{
								common: {
									type: 'InputText',
									model: 'address_4',
									enable: false,
								},
							},
						],
					},
					{
						common: {
							type: 'InputText',
							model: 'address_3',
							enable: false,
						},
					},
				],
			},
		],
	};

	it('-> getModuleConfig', () => {
		expect(ModuleController.getModuleConfig('auth2323')).toEqual({});

		const options = ModuleController.getModuleConfig('auth');
		// @ts-ignore
		expect(options.global.foo).toEqual(111);
	});

	it('-> init. correct work', () => {
		const windowExample = {
			Datepicker: true,
		};

		const checker = () => windowExample.Datepicker;
		const successLoad = () => {
			expect(true).toBeTruthy();
		};
		const failLoad = () => {};

		ModuleController.init(checker, successLoad, failLoad);
	});
});
