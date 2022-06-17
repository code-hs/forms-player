import {describe, it, expect} from '@jest/globals';
import {
	MultiBoxView,
	Group,
} from '@/classes/components/layout/multibox/MultiBoxView';
import {Field} from '@/classes/components/field/params';

describe('MultiBoxView class -> generateGroups', () => {
	it('correct work', () => {
		const multiBoxName: string = 'box-1';
		const field: Field = {
			generalParams: {
				type: 'InputText',
				model: 'address_1',
			},
		};
		const group: Group = [field];
		const groups: Group[] = MultiBoxView.generateGroups(group, multiBoxName);
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

		const group1: Group = groups[0];
		const field1: Field = group1[0];
		// @ts-ignore
		expect(field1.customParams.multi.name).toBe(multiBoxName);
	});

	it('MultiBoxView class -> generateNewItem', () => {
		const field: Field = {
			generalParams: {
				type: 'InputText',
				model: 'address_1',
			},
			customParams: {
				multi: {
					name: 'box-1',
					key: 1238435724,
				},
			},
		};
		const group: Group = [field];
		const groups: Group[] = [group];

		const newGroup: Group = MultiBoxView.generateNewGroup(groups);
		const fieldInGroup: Field = newGroup[0];

		expect(fieldInGroup.generalParams.model).toBe('address_1');
		// @ts-ignore
		expect(fieldInGroup.customParams.multi.name).toBe('box-1');
	});
});
