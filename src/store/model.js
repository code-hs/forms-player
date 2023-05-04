// noinspection ES6UnusedImports

import Vue from 'vue';
import {deepCopy} from '@/utils/objects';
import {
	// eslint-disable-next-line import/named
	ModelController,
	// eslint-disable-next-line no-unused-vars
	ModelStructureStore,
} from '@/libs/model/model-structure';

// eslint-disable-next-line no-unused-vars
import {Page} from '@/libs/scheme/scheme.types';

/**
 * @param {ModelStructureStore} structure
 */
const state = () => ({
	structure: {},
});

const getters = {
	structure: s => s.structure,
};

const mutations = {
	/*
	 * @param {Page} page
	 */
	generateSkeleton: (s, page) => {
		if (!page) {
			throw new Error('model.generateSkeleton: param page is empty');
		}

		s.structure = new ModelController().generateStructure(page);
	},

	/**
	 * Add field to model structure
	 * @param {string} inputModelName
	 * @param {string} inputValue
	 */
	initField: (s, {inputModelName, inputValue}) => {
		if (!inputModelName) {
			throw new Error('model.initField: param inputModelName is empty');
		}
		if (s.structure[inputModelName] !== undefined) {
			throw new Error('model.initField: model already exists');
		}

		Vue.set(s.structure, inputModelName, inputValue);
	},

	/**
	 * Remove block of fields from multiBox
	 * @param {string} multiboxName - multibox component model value
	 * @param {number} itemIndex
	 */
	removeItemInMultiBox: (s, {multiboxName, itemIndex}) => {
		s.structure[multiboxName].splice(itemIndex, 1);
	},

	/**
	 * Add new item to multiBox
	 * @param {string} multiboxName
	 */
	addItemInMultiBox(s, {multiboxName}) {
		if (!s.structure || !s.structure[multiboxName]) {
			throw new Error(
				'model.copyItemInMultiBox: bad structure or cant find that multiboxName in structure'
			);
		}

		// one object with fields
		const sourceItem = s.structure[multiboxName][0];
		if (!sourceItem) {
			throw new Error('model.copyItemInMultiBox: sourceItem is empty');
		}
		// without reactivity
		const newItem = deepCopy(sourceItem);

		// clear values
		Object.keys(newItem).forEach(key => {
			newItem[key] = '';
		});

		s.structure[multiboxName].push(newItem);
	},
};

const actions = {
	/**
	 * @param {string} fieldName
	 * @param {string} multiboxName
	 * @param {number} multiboxId
	 */
	getValueFromStructure({state}, {fieldName, multiboxName, multiboxIndex}) {
		if (!fieldName) {
			throw new Error('model.getValueFromStructure: param fieldName is empty');
		}
		if (!state.structure) {
			throw new Error('model.getValueFromStructure: structure is empty');
		}

		if (multiboxName) {
			if (!state.structure[multiboxName] || multiboxIndex === undefined) {
				throw new Error(
					'model.getValueFromStructure: cant find multiboxName' +
						' in structure or multiboxIndex is empty'
				);
			}

			const multiboxItem = state.structure[multiboxName][multiboxIndex];
			return multiboxItem[fieldName];
		}

		return state.structure[fieldName];
	},

	/**
	 * @param {ModelStructureStore} values
	 */
	setValues({state}, savedModelData) {
		const entries = Object.entries(state.structure);

		for (const [key, value] of entries) {
			if (value instanceof Array) {
				// if array - multibox container
				const multiboxName = key;
				// multibox is not empty, and has fields
				if (!savedModelData[multiboxName] || !Object.keys(savedModelData[multiboxName]).length) {
					continue;
				}

				state.structure[multiboxName] = savedModelData[multiboxName];
			} else if (key in savedModelData && savedModelData[key] !== undefined) {
				// another field (not multibox)
				// not a boolean, because field can be boolean and be FALSE values
				state.structure[key] = savedModelData[key];
			}
		}
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
