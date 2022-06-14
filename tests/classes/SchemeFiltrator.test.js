import {describe, it, expect} from '@jest/globals';
import {SchemeFiltrator} from '@/classes/scheme/SchemeFiltrator';

describe('SchemeFiltrator class -> filtrateParamEnable', () => {
	it('correct work', () => {
		const scheme = {
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

		const filteredComponents = SchemeFiltrator.filtrateParamEnable(scheme);
		const pageComponents = filteredComponents.pages[0].components;

		expect(pageComponents.length).toBe(2);
		expect(pageComponents[0].generalParams.model).toBe('address_1');
		expect(pageComponents[1].generalParams.model).toBe('address_2');

		expect(pageComponents[1].components.length).toBe(0);
	});
});
