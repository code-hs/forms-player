import Vue from 'vue';
import {ModelStructure} from '@/classes/scheme/ModelStructure';

const state = () => ({
	structure: [],
});

const getters = {
	structure: s => s.structure,
};

const mutations = {
	generateSkeleton: (s, page) => {
		s.structure = ModelStructure.generate(page);
	},

	/**
	 * Add file to model structure
	 *
	 * @param {number} groupIndex
	 * @param {number} fieldsetIndex
	 * @param {string} inputModelName
	 * @param {string} inputValue
	 */
	initField: (s, {groupIndex, fieldsetIndex, inputModelName, inputValue}) => {
		// clarification position
		const fieldset = s.structure[groupIndex][fieldsetIndex];
		Vue.set(fieldset, inputModelName, inputValue);
	},

	/**
	 * Remove fieldset from current group
	 *
	 * @param {number} groupIndex
	 * @param {number} fieldsetIndex
	 */
	removeFieldsetItem: (s, {groupIndex, fieldsetIndex}) => {
		s.structure[groupIndex].splice(fieldsetIndex, 1);
	},

	/**
	 * Add new fieldset item to structure
	 *
	 * @param {number} groupIndex
	 */
	copyFieldsetItem: (s, {groupIndex}) => {
		const exampleIndex = 0;
		const exampleItem = s.structure[groupIndex][exampleIndex];
		if (!exampleItem) return;

		// without reactivity
		const newItem = JSON.parse(JSON.stringify(exampleItem));
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
