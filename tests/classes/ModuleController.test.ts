import {describe, it, expect} from '@jest/globals';
import {SchemeController} from '@/classes/scheme/SchemeController';
import {ModuleController} from '@/classes/modules/ModuleController';
import {SmartTimeout} from '@/utils/SmartTimeout';

// fix not useful messaging
console.error = () => {};

describe('InitModule class', () => {
	// @ts-ignore
	SchemeController.scheme = {
		config: {
			modules: [
				{
					name: 'auth',
					enable: false,
					config: {
						forEachField: {
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
		// disable error logging
		expect(ModuleController.getModuleConfig('auth2323')).toEqual({});

		const options = ModuleController.getModuleConfig('auth');
		// @ts-ignore
		expect(options.forEachField.foo).toEqual(111);
	});

	it('-> waitWhenLoaded. correct work', async () => {
		const windowExample = {
			Datepicker: true,
		};
		const smtt = SmartTimeout.createForLoadFile();
		const checker = () => windowExample.Datepicker;

		await ModuleController.waitWhenLoaded(checker, smtt);
		expect(true).toBeTruthy();
	});

	// it('-> waitWhenLoaded. incorrect work', () => {
	// 	const windowExample = {
	// 		Datepicker111: true,
	// 	};
	// 	const smtt = SmartTimeout.createForLoadFile();
	// 	// @ts-ignore
	// 	const checker = () => windowExample.Datepicker;
	//
	// 	expect(async () => {
	// 		await ModuleController.waitWhenLoaded(checker, smtt);
	// 	}).toThrow();
	// });
});
