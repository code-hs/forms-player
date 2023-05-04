import {Field, Page} from '@/libs/scheme/scheme.types';

/*
 * {
 *	"multi_box_1": [
 * 		{}
 * 	],
 * 	"first": "",
 * 	"second": "",
 * 	"surname": ""
 * }
 */

export type MultiboxItem = Record<string, string>;
export type MultiboxContainer = MultiboxItem[];
export type ModelStructureStore = Record<string, string | MultiboxContainer>;

export class ModelController {
	/**
	 * Generate a structure for the current page, based on the page structure
	 */
	generateStructure(page: Page): ModelStructureStore {
		if (!page?.components) return {};

		return this.getComponentStructure(page);
	}

	private getComponentStructure(field: Page | Field): ModelStructureStore {
		const optionalStructure = this.getMultiboxStructure(field as Field);
		const innerStructure = this.getInnerStructure(field);

		return {...optionalStructure, ...innerStructure} as ModelStructureStore;
	}

	private getMultiboxStructure(field: Field): ModelStructureStore {
		// this function is only for multibox
		if (field?.common?.type !== 'MultiBox' || !field.common.model) {
			return {};
		}

		// process multibox structure
		const structure: ModelStructureStore = {};
		// create a store for future fields
		const inputsStore: MultiboxItem = {};
		const multiBoxModel: string = field.common.model;
		structure[multiBoxModel] = [inputsStore] as MultiboxContainer;

		return structure;
	}

	private getInnerStructure(field: Page | Field): ModelStructureStore {
		if (!field?.components?.length) return {};

		return field.components.reduce((store, child: Field) => {
			const childStructure: ModelStructureStore = this.getComponentStructure(child);

			return {...store, ...childStructure};
		}, {} as ModelStructureStore);
	}
}
