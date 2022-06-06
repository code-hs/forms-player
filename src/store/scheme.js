import {SchemeController} from '@/classes/scheme/SchemeController';

let schemeItem;

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
		schemeItem = new SchemeController();
		schemeItem.load();
	},
	/**
	 * @param {string} pageKey
	 * @returns {Object} - scheme
	 */
	initPage({commit}, pageKey) {
		if (!pageKey) {
			throw new Error('scheme.initPage: param pageName is empty');
		}

		const pageStructure = schemeItem.getPageStructure(pageKey);
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
