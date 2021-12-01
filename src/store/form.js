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
	async init() {
		schemeObject = new SchemeParser();
		await schemeObject.load();
	},

	async initPage({commit}, urlHash) {
		const page = await schemeObject.getPage(urlHash);
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
