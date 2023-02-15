import {describe, it, expect} from '@jest/globals';
import {Multibox, Group} from '@/libs/components/layout/multibox/multibox';
import {Field} from '@/libs/scheme/scheme.types';

describe('Multibox class -> generateGroups', () => {
	it('correct work', () => {
		const multiboxName: string = 'box-1';
		const field: Field = {
			common: {
				type: 'InputText',
				model: 'address_1',
			},
		};
		const group: Group = [field];
		const groups: Group[] = new Multibox(group, multiboxName).createGroups();
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
		expect(field1.custom.multi.name).toBe(multiboxName);
	});

	it('Multibox class -> createGroup, return correct item', () => {
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

		const newGroup: Group = Multibox.createGroup(groups);
		const fieldInGroup: Field = newGroup[0];

		expect(fieldInGroup.common.model).toBe('address_1');
		// @ts-ignore
		expect(fieldInGroup.custom.multi.name).toBe('box-1');
		// @ts-ignore
		expect(fieldInGroup.custom.multi.key).not.toBe(field.custom.multi.key);
	});
});
