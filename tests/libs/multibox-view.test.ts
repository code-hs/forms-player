import {describe, it, expect} from '@jest/globals';
import {
	MultiBoxView,
	Group,
} from '@/libs/components/layout/multibox/multibox-view';
import {Field} from '@/libs/scheme/scheme-structure';

describe('MultiBoxView class -> generateGroups', () => {
	it('correct work', () => {
		const multiBoxName: string = 'box-1';
		const field: Field = {
			common: {
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
		// 			common: {
		// 				type: 'InputText',
		// 				model: 'address_1',
		//			},
		// 			custom: {
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
		expect(field1.custom.multi.name).toBe(multiBoxName);
	});

	it('MultiBoxView class -> generateNewItem', () => {
		const field: Field = {
			common: {
				type: 'InputText',
				model: 'address_1',
			},
			custom: {
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

		expect(fieldInGroup.common.model).toBe('address_1');
		// @ts-ignore
		expect(fieldInGroup.custom.multi.name).toBe('box-1');
	});
});
