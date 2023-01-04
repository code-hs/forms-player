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
import {Page} from '@/libs/scheme/scheme-structure';

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
				'model.copyItemInMultiBox: bad structure or cant find' +
					' that multiboxName in structure'
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

export default {
	namespaced: true,
	state,
	getters,
	mutations,
};
