import {describe, it, expect} from '@jest/globals';
import {MultiBoxView} from '@/classes/components/layout/multibox/MultiBoxView';

describe('MultiBoxView class -> generateGroups', () => {
	it('correct work', () => {
		const multiBoxName = 'box-1';
		const components = [
			{
				generalParams: {
					type: 'InputText',
					model: 'address_1',
				},
			},
		];
		const groups = MultiBoxView.generateGroups(components, multiBoxName);
		// groups
		// [
		// 	[
		// 		{
		// 			generalParams: {
		// 				type: 'InputText',
		// 				model: 'address_1',
		//			},
		// 			customParams: {
		// 				multi: {
		// 					name: 'box-1',
		// 					key: 'random key',
		// 				},
		// 			},
		// 		},
		// 	],
		// ];

		const group1 = groups[0];
		const field1 = group1[0];

		expect(field1.customParams.multi.name).toBe(multiBoxName);
	});

	it('MultiBoxView class -> generateNewItem', () => {
		const groups = [
			[
				{
					generalParams: {
						type: 'InputText',
						model: 'address_1',
					},
					customParams: {
						multi: {
							name: 'box-1',
							key: 'random key',
						},
					},
				},
			],
		];

		const newGroup = MultiBoxView.generateNewGroup(groups);
		const fieldInGroup = newGroup[0];

		expect(fieldInGroup.generalParams.model).toBe('address_1');
		expect(fieldInGroup.customParams.multi.name).toBe('box-1');
	});
});
