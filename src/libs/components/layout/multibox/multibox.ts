import {generateKey} from '@/utils/random';
import {deepCopy} from '@/utils/objects';
import {Field, CustomParams} from '@/libs/scheme/scheme.types';
import type {ModelStructureStore, MultiboxContainer} from '@/libs/model/model-structure';

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

	createGroups(modelData: ModelStructureStore): Groups {
		// create groups from components
		this.writeInfo(this.group);
		const groupsCount: number = this.getGroupCount(modelData);

		return new Array(groupsCount).fill(this.group);
	}

	getGroupCount(modelData: ModelStructureStore): number {
		// If we have any data in modelData multibox, -> then we return the number of elements,
		// for reproduce the data in field
		if (modelData && modelData[this.multiboxName]) {
			const container = modelData[this.multiboxName] as MultiboxContainer;

			if (container.length > 1) {
				return container.length;
			}
		}

		// default return 1
		return 1;
	}

	private writeInfo(group: Group): void {
		if (!group.length) return;

		group.forEach((field: Field) => {
			if (!field.custom) {
				field.custom = {} as CustomParams;
			}
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
				throw new Error('MultiBox.createGroup: field.custom.multi is empty');
			}
			field.custom.multi.key = generateKey();
		});

		return newItem;
	}
}
