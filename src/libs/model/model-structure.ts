import {Field, Page} from '@/libs/scheme/schemeStructure';

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
export interface ModelStructureStore {
	[key: string]: string | object;
}

export class ModelStructure {
	/**
	 * Generate a structure for the current page, based on the page structure
	 */
	static generate(page: Page): ModelStructureStore {
		if (!page?.components) return {};

		return this.getComponentStructure(page);
	}

	private static getComponentStructure(
		field: Page | Field
	): ModelStructureStore {
		const optionalStructure = this.getOptionalStructure(field as Field);
		const innerStructure = this.getInnerStructure(field);

		return {...optionalStructure, ...innerStructure} as ModelStructureStore;
	}

	private static getOptionalStructure(field: Field): ModelStructureStore {
		if (field?.common?.type !== 'MultiBox' || !field.common.model) {
			return {};
		}

		const structure: ModelStructureStore = {};
		// create a store for future fields
		const inputsStore: ModelStructureStore = {};
		const multiBoxModel: string = field.common.model;

		structure[multiBoxModel] = [inputsStore];

		return structure;
	}

	private static getInnerStructure(field: Page | Field): ModelStructureStore {
		if (!field?.components?.length) return {};

		return field.components.reduce((store, child: Field) => {
			const childStructure: ModelStructureStore =
				this.getComponentStructure(child);

			return {...store, ...childStructure};
		}, {} as ModelStructureStore);
	}
}
