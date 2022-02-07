import SchemeParser from '../classes/scheme/SchemeParser';

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
	/**
	 * @param {string} urlHash - page url
	 * @returns {Object} - scheme
	 */
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
