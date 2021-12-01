import SchemeParser from '../classes/scheme/SchemeParser';
// экземпляр класса Scheme
let schemeObject;

const state = () => ({
	page: null,
	inputsStructure: null,
});

const getters = {
	page: s => s.page,
	// inputsStructure - use only from computed
	inputsStructure: s => s.inputsStructure,
};

const mutations = {
	setPage: (s, v) => {
		s.page = v;
	},
	setInputsStructure: (s, v) => {
		s.inputsStructure = v;
	},
};

const actions = {
	async init() {
		schemeObject = new SchemeParser();
		await schemeObject.load();
	},

	async getPage({commit}, urlHash) {
		const page = await schemeObject.getPage(urlHash);
		commit('setPage', page);

		return page;
	},

	generateInputsStructure({commit, getters}) {
		const inputsStructure = SchemeParser.generateInputsStructure(getters.page);

		commit('setInputsStructure', inputsStructure);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
