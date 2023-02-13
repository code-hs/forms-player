import {describe, it, expect} from '@jest/globals';
import {ModelController, ModelStructureStore} from '@/libs/model/model-structure';
import {Field, Page} from '@/libs/scheme/scheme-structure';

describe('ModelStructure class -> generate', () => {
	it('correct work', () => {
		const field1: Field = {
			common: {
				type: 'InputText',
				model: 'address_1',
			},
		};
		const field2: Field = {
			common: {
				type: 'InputText',
				model: 'address_2',
			},
		};

		const field311: Field = {
			common: {
				type: 'InputText',
				model: 'col-1',
			},
		};
		const field31: Field = {
			common: {
				type: 'LayoutColumn',
				model: 'col-1',
			},
			custom: {
				col: 6,
			},
			components: [field311],
		};

		const field321: Field = {
			common: {
				type: 'InputText',
				model: 'col-2',
			},
		};
		const field32: Field = {
			common: {
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
					common: {
						type: 'layoutColumns',
					},
					components: [field31, field32],
				},
				{
					common: {
						type: 'MultiBox',
						model: 'multi_box_1',
						enable: true,
					},
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
							},
						},
					],
				},
			],
		};

		const model: ModelStructureStore = new ModelController().generateStructure(page);

		expect(typeof model).toBe('object');
		expect('multi_box_1' in model).toBeTruthy();
		expect(Array.isArray(model.multi_box_1)).toBeTruthy();
	});
});
