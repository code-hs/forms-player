import {generateKey} from '@/utils/numbers';

export class GroupView {
	static getNewItem(fieldsets) {
		const index = 0;
		const item = JSON.parse(JSON.stringify(fieldsets[index]));

		// need without reactivity, for set new key;
		item.key = generateKey();

		return item;
	}
}
