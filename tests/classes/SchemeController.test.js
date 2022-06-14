import {describe, it, expect} from '@jest/globals';
import {SchemeController} from '@/classes/scheme/SchemeController';

describe('SchemeController class -> isValidStructure', () => {
	it('correct work', () => {
		const scheme = {
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
		expect(SC.isValidStructure()).toBeFalsy();
		SC._scheme = scheme;

		expect(SC.isValidStructure()).toBeTruthy();

		const page = SC.getPageStructure('welcome_1');
		expect(page.key).toBe('welcome_1');
	});
});
