import SchemeParser from '../classes/scheme/SchemeParser';

// экземпляр класса Scheme
let schemeParser;

const state = () => ({
	currentPage: null,
});

const getters = {
	currentPage: s => s.currentPage,
};

const mutations = {
	setCurrentPage: (s, v) => {
		s.currentPage = v;
	},
};

const actions = {
	load() {
		schemeParser = new SchemeParser();
		schemeParser.load();
	},
	initPage({commit}, urlHash) {
		const page = schemeParser.getPage(urlHash);
		commit('setCurrentPage', page);

		return page;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
