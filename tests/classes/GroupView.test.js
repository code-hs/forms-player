import {describe, it, expect} from '@jest/globals';
import {GroupView} from '@/classes/group/GroupView';
import {isObject} from '@/utils/objects';

describe('GroupView class -> getNewItem', () => {
	it('correct work', () => {
		const fieldsets = [
			{
				description: 'user address',
				key: 407987556988,
			},
		];

		const res = GroupView.getNewItem(fieldsets);
		// { description: 'user address', key: 700006027742 }

		expect(isObject(res)).toBe(true);
		expect(res.description).toBe('user address');
	});
});
