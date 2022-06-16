import {generateKey} from '@/utils/random';
import {
	ComponentParams,
	customParamsExample,
} from '@/classes/components/field/params';

// stack of components
type Group = ComponentParams[];

export class MultiBoxView {
	/**
	 * @param {string} multiBoxName - model of multiBox
	 */
	static generateGroups(components: Group, multiBoxName: string): Group[] {
		// group from exists components
		const firstGroup: Group = components;
		this._addMultiBoxInfo(firstGroup, multiBoxName);

		return [firstGroup] as Group[];
	}

	/**
	 * Edit out data
	 * @param {string} multiBoxName - model of multiBox
	 */
	static _addMultiBoxInfo(group: Group, multiBoxName: string): void {
		if (!group.length) return;

		// add info about multibox
		group.forEach((field: ComponentParams) => {
			if (!field.customParams) field.customParams = customParamsExample;

			// generate unique keys for each item, since we remove and add these items
			// if this is not done, vue lazily updates the blocks
			field.customParams.multi = {
				name: multiBoxName,
				key: generateKey(),
			};

			// start recursion
			if (field.components) {
				this._addMultiBoxInfo(field.components, multiBoxName);
			}
		});
	}

	/**
	 * Get new item, when click button ADD
	 */
	static generateNewGroup(groups: Group[]): Group {
		if (!groups?.length) {
			throw new Error('MultiBoxView.generateNewGroup: param groups is empty');
		}

		const source: Group = groups[0];
		const newGroup: Group = JSON.parse(JSON.stringify(source));

		newGroup.forEach((field: ComponentParams) => {
			// update only key
			if (!field?.customParams?.multi) {
				throw new Error(
					'MultiBoxView.generateNewGroup: field.customParams.multi is empty'
				);
			}
			field.customParams.multi.key = generateKey();
		});

		return newGroup;
	}
}
