import SchemeParser from '../classes/scheme/SchemeParser';
// экземпляр класса Scheme
let schemeObject;

const state = () => ({
	page: null,
});

const getters = {
	page: s => s.page,
};

const mutations = {
	setPage: (s, v) => {
		s.page = v;
	},
};

const actions = {
	init() {
		schemeObject = new SchemeParser();
		schemeObject.load();
	},
	initPage({commit}, urlHash) {
		const page = schemeObject.getPage(urlHash);
		commit('setPage', page);

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
