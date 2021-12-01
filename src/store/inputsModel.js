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
};

const actions = {};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
