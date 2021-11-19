import SchemeParser from '../classes/scheme/SchemeParser';
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
	async init(ctx, mode) {
		S = new SchemeParser();
		await S.load(mode);
	},

	async getPage({commit}, urlHash) {
		const page = await S.getPage(urlHash);
		commit('setPage', page);

		return page;
	},

	generateInputStructure({getters}) {
		return SchemeParser.generateInputStructure(getters.page);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
