import Vue from 'vue';
import {ModelStructure} from '@/classes/scheme/ModelStructure';

const state = () => ({
	structure: {},
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
			throw new Error('model.generateSkeleton: param pageStructure is empty');
		}

		s.structure = ModelStructure.generate2(pageStructure);
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
			throw new Error('model.initField: param inputModelName is empty');
		}

		// clarification position
		const fieldset = s.structure[groupIndex][fieldsetIndex];
		Vue.set(fieldset, inputModelName, inputValue);
	},

	initField2: (s, {inputModelName, inputValue, multiBoxModel, groupIndex}) => {
		if (!inputModelName) {
			throw new Error('model.initField: param inputModelName is empty');
		}

		if (multiBoxModel) {
			// Vue.set(
			// 	s.structure[multiBoxModel][groupIndex],
			// 	inputModelName,
			// 	inputValue
			// );
		} else {
			Vue.set(s.structure, inputModelName, inputValue);
		}
		// clarification position
	},

	/**
	 * Remove fieldset from current group
	 * @param {number} groupIndex
	 * @param {number} fieldsetIndex
	 */
	removeFieldsetItem: (s, {groupIndex, fieldsetIndex}) => {
		s.structure[groupIndex].splice(fieldsetIndex, 1);
	},

	removeGroupItem: (s, {groupName, groupItemIndex}) => {
		s.structure[groupName].splice(groupItemIndex, 1);
	},

	// multibox model
	copyGroupItem(s, {groupName}) {
		const sourceItem =
			s.structure[groupName][s.structure[groupName].length - 1];
		const newItem = JSON.parse(JSON.stringify(sourceItem));

		// clear values
		Object.keys(newItem).forEach(key => {
			newItem[key] = '';
		});

		s.structure[groupName].push(newItem);
	},

	/**
	 * Add new fieldset item to structure
	 * @param {number} groupIndex
	 */
	copyFieldsetItem: (s, {groupIndex}) => {
		if (!s.structure || !s.structure[groupIndex]) {
			throw new Error(
				'model.copyFieldsetItem: bad structure or cant find' +
					' group by groupIndex'
			);
		}

		const index = 0;
		const sourceItem = s.structure[groupIndex][index];

		if (!sourceItem) {
			throw new Error('model.copyFieldsetItem: sourceItem is empty');
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
