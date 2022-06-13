import {generateKey} from '@/utils/random';

export class MultiBoxView {
	/**
	 * Edit out data
	 * @param {Object[]} components - stack of fields
	 * @param {string} multiBoxName - model of multiBox
	 * @returns {[[]]}
	 */
	static generateGroups(components, multiBoxName) {
		const firstGroup = components;
		this._addMultiBoxInfo(firstGroup, multiBoxName);

		return [firstGroup];
	}

	/**
	 * Edit out data
	 * @param {Object[]} components - list of fields
	 * @param {string} multiBoxName - model of multiBox
	 */
	static _addMultiBoxInfo(components, multiBoxName) {
		if (!components.length) return;

		// add info about multibox
		components.forEach(field => {
			if (!field.customParams) field.customParams = {};
			// generate unique keys for each item, since we remove and add these items
			// if this is not done, vue lazily updates the blocks
			field.customParams.multi = {
				name: multiBoxName,
				key: generateKey(),
			};

			if (field.components) {
				this._addMultiBoxInfo(field.components, multiBoxName);
			}
		});
	}

	/**
	 * Get new item, when click button ADD
	 * @param {Object[][]} groups - list of fieldsets
	 * @returns {Object[]}
	 */
	static generateNewGroup(groups) {
		if (!groups?.length) {
			throw new Error('MultiBoxView.getNewItem: param groups is empty');
		}

		const source = groups[0];
		const group = JSON.parse(JSON.stringify(source));

		group.forEach(field => {
			// update only key
			field.customParams.multi.key = generateKey();
		});

		return group;
	}
}
