import {generateKey} from '@/utils/random';
import {deepCopy} from '@/utils/objects';
import {customExample} from '@/libs/components/component/params-source';
import {Field} from '@/libs/scheme/scheme-structure';

// stack of components
export type Group = Field[];
export type Groups = Group[];

export class Multibox {
	private readonly group: Group;
	private readonly multiboxName: string;

	constructor(group: Group, multiboxName: string) {
		this.group = group;
		this.multiboxName = multiboxName;
	}

	createGroups(): Groups {
		// create groups from components, from the first component
		// that component is the basis for all other components, as template
		this.writeInfo(this.group);
		return [this.group] as Groups;
	}

	private writeInfo(group: Group): void {
		if (!group.length) return;

		group.forEach((field: Field) => {
			if (!field.custom) field.custom = customExample;
			// generate unique keys for each item, since we remove and add these items
			// if this is not done, vue lazily updates the blocks
			field.custom.multi = {
				name: this.multiboxName,
				key: generateKey(),
			};
			// start recursion
			if (field.components) {
				this.writeInfo(field.components);
			}
		});
	}

	static createGroup(groups: Group[]): Group {
		if (!groups?.length) {
			throw new Error('MultiBox.createGroup: param groups is empty');
		}

		const source: Group = groups[0];
		const newItem: Group = deepCopy(source);

		// update key
		newItem.forEach((field: Field) => {
			if (!field?.custom?.multi) {
				throw new Error(
					'MultiBox.createGroup: field.custom.multi is empty'
				);
			}
			field.custom.multi.key = generateKey();
		});

		return newItem;
	}
}
