import {describe, it, expect} from '@jest/globals';
import {ModelStructure} from '@/classes/scheme/ModelStructure';

describe('ModelStructure class -> generate', () => {
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
							},
						},
						{
							generalParams: {
								type: 'layoutColumns',
							},
							components: [
								{
									generalParams: {
										type: 'LayoutColumn',
									},
									customParams: {
										col: 6,
									},
									components: [
										{
											generalParams: {
												type: 'InputText',
												model: 'col-1',
											},
										},
									],
								},
								{
									generalParams: {
										type: 'column',
									},
									components: [
										{
											generalParams: {
												type: 'InputText',
												model: 'col-2',
											},
										},
									],
								},
							],
						},
						{
							generalParams: {
								type: 'MultiBox',
								model: 'multi_box_1',
								enable: true,
							},
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
									},
								},
							],
						},
					],
				},
			],
		};

		const page = scheme.pages[0];
		const model = ModelStructure.generate(page);

		expect(typeof model).toEqual('object');
		expect('multi_box_1' in model).toBeTruthy();
		expect(Array.isArray(model.multi_box_1)).toBeTruthy();
	});
});
