import {describe, it, expect} from '@jest/globals';
import {SchemeController} from '@/classes/scheme/SchemeController';
import {InitModule} from '@/classes/modules/InitModule';

describe('InitModule class', () => {
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

	it('-> getModuleOptions', () => {
		expect(() => {
			InitModule.getModuleOptions('auth2323');
		}).toThrow();

		const options: object = InitModule.getModuleOptions('auth');
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

		InitModule.init(checker, successLoad, failLoad);
	});
});
