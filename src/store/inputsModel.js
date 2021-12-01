import SchemeParser from '../classes/scheme/SchemeParser';

const state = () => ({
	structure: null,
});

const getters = {
	structure: s => s.structure,
};

const mutations = {
	setStructure: (s, v) => {
		s.structure = v;
	},
	generateStructure: (s, page) => {
		s.structure = SchemeParser.generateInputsStructure(page);
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
