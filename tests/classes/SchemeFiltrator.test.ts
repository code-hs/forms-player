import {describe, it, expect} from '@jest/globals';
import {SchemeFiltrator} from '@/classes/scheme/SchemeFiltrator';
import {Field, Page, Scheme} from '@/classes/scheme/Structure';

describe('SchemeFiltrator class -> filtrateParamEnable', () => {
	it('correct work', () => {
		const scheme: Scheme = {
			config: {},
			pages: [
				{
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

		const filteredComponents: Scheme =
			SchemeFiltrator.filtrateParamEnable(scheme);
		const page: Page = filteredComponents.pages[0];

		// @ts-ignore
		const pageFields: Field[] = page.components;

		expect(pageFields.length).toBe(2);
		expect(pageFields[0].generalParams.model).toBe('address_1');
		expect(pageFields[1].generalParams.model).toBe('address_2');
		// @ts-ignore
		expect(pageFields[1].components.length).toBe(0);
	});
});
