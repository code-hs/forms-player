import {SchemeController} from '@/classes/scheme/SchemeController';

let schemeItem;

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

		const page = schemeItem.getPage(pageKey);
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
