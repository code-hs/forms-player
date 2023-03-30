import {describe, it, expect} from '@jest/globals';
import {PagesController} from '@/libs/pages/pages-controller';
import {Page, Scheme} from '@/libs/scheme/scheme.types';
import {SchemeController} from '@/libs/scheme/scheme-controller';

describe('PagesController class', () => {
	// @ts-ignore
	SchemeController.scheme = {
		pages: [
			{
				id: 1,
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

	it('-> getAll', () => {
		const scheme: Scheme = SchemeController.getScheme();
		expect(typeof scheme).toBe('object');
		expect(Array.isArray(scheme.pages)).toBeTruthy();
	});

	it('-> getByKey', () => {
		const pageKey = PagesController.getByKey('welcome_1') as Page;
		expect(pageKey.key).toBe('welcome_1');
	});

	it('-> getById', () => {
		const pageId = PagesController.getById(1) as Page;
		expect(pageId.id).toBe(1);
	});
});
