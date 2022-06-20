import Vue from 'vue';
import {ModelStructure} from '@/classes/scheme/ModelStructure.ts';

const state = () => ({
	structure: {},
});

const getters = {
	structure: s => s.structure,
};

const mutations = {
	/*
	 * @param {Object} page
	 */
	generateSkeleton: (s, page) => {
		if (!page) {
			throw new Error('model.generateSkeleton: param page is empty');
		}

		s.structure = ModelStructure.generate(page);
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
	 * @param {string} multiBoxName - multibox component model value
	 * @param {number} itemIndex
	 */
	removeItemInMultiBox: (s, {multiBoxName, itemIndex}) => {
		s.structure[multiBoxName].splice(itemIndex, 1);
	},

	/**
	 * Add new item to multiBox
	 * @param {string} multiBoxName
	 */
	addItemInMultiBox(s, {multiBoxName}) {
		if (!s.structure || !s.structure[multiBoxName]) {
			throw new Error(
				'model.copyItemInMultiBox: bad structure or cant find' +
					' that multiBoxName in structure'
			);
		}

		// one object with fields
		const sourceItem = s.structure[multiBoxName][0];
		if (!sourceItem) {
			throw new Error('model.copyItemInMultiBox: sourceItem is empty');
		}
		// without reactivity
		const newItem = JSON.parse(JSON.stringify(sourceItem));

		// clear values
		Object.keys(newItem).forEach(key => {
			newItem[key] = '';
		});

		s.structure[multiBoxName].push(newItem);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
};
