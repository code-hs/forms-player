import {describe, it, expect} from '@jest/globals';
import {SchemeFiltrator} from '@/libs/scheme/scheme-filtrator';
import {Field, Page, Scheme} from '@/libs/scheme/scheme-structure';

describe('SchemeFiltrator class -> filtrateParamEnable', () => {
	it('correct work', () => {
		const scheme: Scheme = {
			config: {},
			pages: [
				{
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

		new SchemeFiltrator(scheme).filtrate();
		const page: Page = scheme.pages[0];

		// @ts-ignore
		const pageFields: Field[] = page.components;

		expect(pageFields.length).toBe(2);
		expect(pageFields[0].common.model).toBe('address_1');
		expect(pageFields[1].common.model).toBe('address_2');
		// @ts-ignore
		expect(pageFields[1].components.length).toBe(0);
	});
});
