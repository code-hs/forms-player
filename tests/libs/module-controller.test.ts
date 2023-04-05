import {describe, it, expect} from '@jest/globals';
import {SchemeController} from '@/libs/scheme/scheme-controller';
import {ModuleController} from '@/libs/modules/module-controller';
import {SmartTimeout} from '@/utils/smart-timeout';

// fix not useful messaging
console.error = () => {};

describe('ModuleController', () => {
	// @ts-ignore
	SchemeController.scheme = {
		config: {
			modules: [
				{
					name: 'auth',
					enable: true,
					config: {
						forEachField: {
							foo: 111,
						},
					},
				},
				{
					name: 'datepicker',
					enable: true,
					config: {
						foo: 111,
					},
				},
				{
					name: 'datepicker_dis',
					enable: false,
					config: {
						foo: 111,
					},
				},
				{
					name: 'datepicker_true',
					config: {
						foo: 111,
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

	it('-> getConfig', () => {
		// disable error logging
		expect(ModuleController.getConfig('auth2323')).toBeFalsy();

		const options = ModuleController.getConfig('auth');
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

	it('-> isEnable', () => {
		// 1. Test a module that exists and is enabled, expect the function to return true
		expect(ModuleController.isEnable('datepicker')).toBeTruthy();
		// 2. Test a module that exists and is disabled, expect the function to return false
		expect(ModuleController.isEnable('datepicker_dis')).toBeFalsy();
		// 3. Test a module that does not exist, expect the function to return false.
		expect(ModuleController.isEnable('auth2323')).toBeFalsy();
		// 4. Test a module that exists but doesn't have an 'enable' property,
		// expect the function to return true.
		expect(ModuleController.isEnable('datepicker_true')).toBeTruthy();
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
