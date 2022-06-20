import {describe, it, expect} from '@jest/globals';
import {
	ModelStructure,
	ModelStructureStore,
} from '@/classes/scheme/ModelStructure';
import {Field, Page} from '@/classes/scheme/Structure';

describe('ModelStructure class -> generate', () => {
	it('correct work', () => {
		const field1: Field = {
			generalParams: {
				type: 'InputText',
				model: 'address_1',
			},
		};
		const field2: Field = {
			generalParams: {
				type: 'InputText',
				model: 'address_2',
			},
		};

		const field311: Field = {
			generalParams: {
				type: 'InputText',
				model: 'col-1',
			},
		};
		const field31: Field = {
			generalParams: {
				type: 'LayoutColumn',
				model: 'col-1',
			},
			customParams: {
				col: 6,
			},
			components: [field311],
		};

		const field321: Field = {
			generalParams: {
				type: 'InputText',
				model: 'col-2',
			},
		};
		const field32: Field = {
			generalParams: {
				type: 'column',
			},
			components: [field321],
		};

		const page: Page = {
			key: 'welcome_1',
			components: [
				field1,
				field2,
				{
					generalParams: {
						type: 'layoutColumns',
					},
					components: [field31, field32],
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
		};

		const model: ModelStructureStore = ModelStructure.generate(page);

		expect(typeof model).toEqual('object');
		expect('multi_box_1' in model).toBeTruthy();
		expect(Array.isArray(model.multi_box_1)).toBeTruthy();
	});
});
