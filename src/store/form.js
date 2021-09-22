import Scheme from '../classes/Scheme';
// экземпляр класса Scheme
let S = null;

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
	async init(ctx, id) {
		S = new Scheme(id);
		await S.load();
	},

	async getPage({commit}, urlHash) {
		const page = await S.getPage(urlHash);
		commit('setPage', page);

		return page;
	},

	// eslint-disable-next-line no-unused-vars
	generateInputStructure({getters}) {
		return Scheme.generateInputStructure(getters.page);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
