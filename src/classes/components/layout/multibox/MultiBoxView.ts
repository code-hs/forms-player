import {generateKey} from '@/utils/random';
import {Field, customParamsExample} from '@/classes/scheme/Structure';

// stack of components
export type Group = Field[];

export class MultiBoxView {
	/**
	 * @param {string} multiBoxName - model of multiBox
	 */
	static generateGroups(group: Group, multiBoxName: string): Group[] {
		// group from exists fields
		const firstGroup: Group = group;
		this.addMultiBoxInfo(firstGroup, multiBoxName);

		return [firstGroup] as Group[];
	}

	/**
	 * Edit out data
	 * @param {string} multiBoxName - model of multiBox
	 */
	private static addMultiBoxInfo(group: Group, multiBoxName: string): void {
		if (!group.length) return;

		group.forEach((field: Field) => {
			if (!field.customParams) field.customParams = customParamsExample;

			// generate unique keys for each item, since we remove and add these items
			// if this is not done, vue lazily updates the blocks
			field.customParams.multi = {
				name: multiBoxName,
				key: generateKey(),
			};

			// start recursion
			if (field.components) {
				this.addMultiBoxInfo(field.components, multiBoxName);
			}
		});
	}

	/**
	 * Generate new item, on click button ADD
	 */
	static generateNewGroup(groups: Group[]): Group {
		if (!groups?.length) {
			throw new Error('MultiBoxView.generateNewGroup: param groups is empty');
		}

		const source: Group = groups[0];
		const newGroup: Group = JSON.parse(JSON.stringify(source));

		newGroup.forEach((field: Field) => {
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
