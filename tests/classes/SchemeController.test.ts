import {describe, it, expect} from '@jest/globals';
import {SchemeController} from '@/classes/scheme/SchemeController';
import {Scheme, Page} from '@/classes/scheme/Structure';

describe('SchemeController class -> isValidStructure', () => {
	it('correct work', () => {
		const scheme: Scheme = {
			config: {},
			pages: [
				{
					key: 'welcome_1',
					components: [
						{
							generalParams: {
								type: 'InputText',
								model: 'address_1',
							},
						},
						{
							generalParams: {
								type: 'InputText',
								model: 'address_2',
								enable: true,
							},
							components: [
								{
									generalParams: {
										type: 'InputText',
										model: 'address_4',
										enable: false,
									},
								},
							],
						},
						{
							generalParams: {
								type: 'InputText',
								model: 'address_3',
								enable: false,
							},
						},
					],
				},
			],
		};

		const SC = new SchemeController();
		expect(SC.isValid()).toBeFalsy();
		// @ts-ignore
		SC.scheme = scheme;
		expect(SC.isValid()).toBeTruthy();

		const page: Page = SC.getPage('welcome_1');
		expect(page.key).toBe('welcome_1');
	});
});
