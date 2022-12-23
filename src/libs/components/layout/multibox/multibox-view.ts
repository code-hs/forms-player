import {generateKey} from '@/utils/random';
import {deepCopy} from '@/utils/objects';
import {customExample} from '@/libs/components/component/params-source';
import {Field} from '@/libs/scheme/scheme-structure';

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
			if (!field.custom) field.custom = customExample;

			// generate unique keys for each item, since we remove and add these items
			// if this is not done, vue lazily updates the blocks
			field.custom.multi = {
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
		const newGroup: Group = deepCopy(source);

		newGroup.forEach((field: Field) => {
			// update only key
			if (!field?.custom?.multi) {
				throw new Error(
					'MultiBoxView.generateNewGroup: field.custom.multi is empty'
				);
			}
			field.custom.multi.key = generateKey();
		});

		return newGroup;
	}
}
