import {PagesController} from '@/libs/pages/pages-controller';
// eslint-disable-next-line no-unused-vars
import {Page} from '@/libs/scheme/scheme.types';

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
	/**
	 * @param {string} pageKey
	 * @returns {Page} page
	 */
	initPage({commit}, pageKey) {
		if (!pageKey) {
			throw new Error('scheme.initPage: param pageKey is empty');
		}

		const page = PagesController.getByKey(pageKey);
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
