import {SchemeController} from '@/libs/scheme/SchemeController';
// eslint-disable-next-line no-unused-vars
import {Page} from '@/libs/scheme/schemeStructure';

/**
 * @param {Page} page
 */
const state = () => ({
	page: null,
});

const getters = {
	page: s => s.page,
};

const mutations = {
	/**
	 * @param {Page} v
	 */
	setPage: (s, v) => {
		s.page = v;
	},
};

const actions = {
	load() {
		return SchemeController.load();
	},
	/**
	 * @param {string} pageKey
	 * @returns {Page} page
	 */
	initPage({commit}, pageKey) {
		if (!pageKey) {
			throw new Error('scheme.initPage: param pageKey is empty');
		}

		const page = SchemeController.getPage(pageKey);
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
