import {generateKey} from '@/utils/random';

export class MultiBoxView {
	/**
	 * @param {Object[]} fields - list of fields
	 * @param {String} multiBoxName - model of multiBox
	 * @returns {Object[]}
	 */
	static initGroups(fields, multiBoxName) {
		const groups = [];

		if (!fields.length) return groups;

		// add info about multibox
		fields.forEach(field => {
			if (!field.customParams) field.customParams = {};
			// generate unique keys for each item, since we remove and add these items
			// if this is not done, vue lazily updates the blocks
			field.customParams.multi = {
				name: multiBoxName,
				key: generateKey(),
			};

			if (field.components) {
				MultiBoxView.initGroups(field.components, multiBoxName);
			}
		});

		groups.push(fields);

		return groups;
	}

	/**
	 * Get new item, when click button ADD
	 * @param {Object[]} groups - list of fieldsets
	 * @returns {Object|boolean}
	 */
	static generateNewItem(groups) {
		if (!groups?.length) {
			throw new Error('MultiBoxView.getNewItem: param groups is empty');
		}

		const sourceItem = groups[0];
		const newItem = JSON.parse(JSON.stringify(sourceItem));

		// set new key
		newItem.forEach(field => {
			field.customParams.multi.key = generateKey();
		});

		return newItem;
	}
}
