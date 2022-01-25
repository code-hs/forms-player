import Vue from 'vue';
import {ModelStructure} from '../classes/scheme/ModelStructure';

const state = () => ({
	structure: [],
});

const getters = {
	structure: s => s.structure,
};

const mutations = {
	setStructure: (s, v) => {
		s.structure = v;
	},
	generateStructure: (s, page) => {
		s.structure = ModelStructure.generate(page);
	},
	initField: (s, {groupIndex, fieldsetIndex, inputModelName, inputValue}) => {
		const fieldset = s.structure[groupIndex][fieldsetIndex];
		Vue.set(fieldset, inputModelName, inputValue);
	},

	removeFieldsetItem: (s, {groupIndex, fieldsetIndex}) => {
		// отправляемся в модель текущей группы, и удаляем из нее fieldset
		s.structure[groupIndex].splice(fieldsetIndex, 1);
	},

	/**
	 * Add new fieldset item to structure
	 * @param s
	 * @param {number} groupIndex
	 */
	copyFieldsetItem: (s, {groupIndex}) => {
		const exampleIndex = 0;
		const exampleItem = s.structure[groupIndex][exampleIndex];
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
