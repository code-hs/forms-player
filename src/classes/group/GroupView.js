import {generateKey} from '@/utils/random';

export class GroupView {
	/**
	 * Get new item, when click button
	 * @param fieldsets
	 * @returns {Object|boolean}
	 */
	static getNewItem(fieldsets) {
		if (!fieldsets || !fieldsets.length) {
			throw new Error('GroupView.getNewItem: param fieldsets is empty');
		}

		const index = 0;
		// need without reactivity, for set new key;
		const item = JSON.parse(JSON.stringify(fieldsets[index]));
		if (!item) throw new Error('GroupView.getNewItem: variable item  is empty');

		item.itemKey = generateKey();

		return item;
	}
}
