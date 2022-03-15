import Vue from 'vue';
import {ModelStructure} from '@/classes/scheme/ModelStructure';

const state = () => ({
	structure: [],
});

const getters = {
	structure: s => s.structure,
};

const mutations = {
	/*
	 * @param {Object} pageStructure
	 */
	generateSkeleton: (s, pageStructure) => {
		if (!pageStructure) {
			throw new Error('model: generateSkeleton: bad pageStructure');
		}

		s.structure = ModelStructure.generate(pageStructure);
	},

	/**
	 * Add file to model structure
	 * @param {number} groupIndex
	 * @param {number} fieldsetIndex
	 * @param {string} inputModelName
	 * @param {string} inputValue
	 */
	initField: (s, {groupIndex, fieldsetIndex, inputModelName, inputValue}) => {
		if (!inputModelName) {
			throw new Error('model: initField: bad inputModelName');
		}

		// clarification position
		const fieldset = s.structure[groupIndex][fieldsetIndex];
		Vue.set(fieldset, inputModelName, inputValue);
	},

	/**
	 * Remove fieldset from current group
	 * @param {number} groupIndex
	 * @param {number} fieldsetIndex
	 */
	removeFieldsetItem: (s, {groupIndex, fieldsetIndex}) => {
		s.structure[groupIndex].splice(fieldsetIndex, 1);
	},

	/**
	 * Add new fieldset item to structure
	 * @param {number} groupIndex
	 */
	copyFieldsetItem: (s, {groupIndex}) => {
		if (!s.structure || !s.structure[groupIndex]) {
			throw new Error(
				'model: copyFieldsetItem: bad structure or cant find' +
					' group by groupIndex'
			);
		}

		const index = 0;
		const sourceItem = s.structure[groupIndex][index];

		if (!sourceItem) {
			throw new Error('model: copyFieldsetItem: bad sourceItem');
		}

		// without reactivity
		const newItem = JSON.parse(JSON.stringify(sourceItem));
		s.structure[groupIndex].push(newItem);
	},
};

const actions = {};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
