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
};

const actions = {
	generateStructure({commit}, page) {
		const structure = SchemeParser.generateInputsStructure(page);

		commit('setStructure', structure);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
