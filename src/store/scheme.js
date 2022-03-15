import {SchemeParser} from '@/classes/scheme/SchemeParser';

let schemeParser;

const state = () => ({
	pageStructure: null,
});

const getters = {
	pageStructure: s => s.pageStructure,
};

const mutations = {
	setPageStructure: (s, v) => {
		s.pageStructure = v;
	},
};

const actions = {
	load() {
		schemeParser = new SchemeParser();
		schemeParser.load();
	},
	/**
	 * @param {string} pageName - page url
	 * @returns {Object} - scheme
	 */
	initPage({commit}, pageName) {
		if (!pageName) {
			throw new Error('scheme: initPage: bad urlHash');
		}

		const pageStructure = schemeParser.getPageStructure(pageName);
		commit('setPageStructure', pageStructure);

		return pageStructure;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
