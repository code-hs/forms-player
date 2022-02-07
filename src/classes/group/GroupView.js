import {generateKey} from '@/utils/numbers';

export class GroupView {
	static getNewItem(fieldsets) {
		const index = 0;
		// need without reactivity, for set new key;
		const item = JSON.parse(JSON.stringify(fieldsets[index]));
		item.key = generateKey();

		return item;
	}
}
