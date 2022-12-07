import {describe, it, expect} from '@jest/globals';
import {SchemeController} from '@/libs/scheme/scheme-controller';
import {Scheme, Page, Configurations} from '@/libs/scheme/scheme-structure';

describe('SchemeController class', () => {
	const scheme: Scheme = {
		config: {
			modules: [
				{
					name: 'auth',
					enable: false,
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
	// @ts-ignore
	SchemeController.scheme = scheme;

	it('-> isValid', () => {
		// @ts-ignore
		SchemeController.scheme = null;
		expect(SchemeController.isValid()).toBeFalsy();
		// @ts-ignore
		SchemeController.scheme = scheme;
		expect(SchemeController.isValid()).toBeTruthy();

		const page: Page = SchemeController.getPage('welcome_1');
		expect(page.key).toBe('welcome_1');
	});

	it('-> getPage', () => {
		const page: Page = SchemeController.getPage('welcome_1');
		expect(page.key).toBe('welcome_1');
	});

	it('-> getConfig', () => {
		const configuration: Configurations = SchemeController.getConfig();
		// @ts-ignore
		expect(configuration.modules[0].name).toBe('auth');
	});
});
