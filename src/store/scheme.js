import {SchemeController} from '@/libs/scheme/scheme-controller';
// eslint-disable-next-line no-unused-vars
import {Page} from '@/libs/scheme/scheme.types';

/**
 * @param {Page} page
 */
const state = () => ({
	page: null,
	pages: [],
});

const getters = {
	page: s => s.page,
	pages: s => s.pages,
};

const mutations = {
	/**
	 * @param {Page} v
	 */
	setPage: (s, v) => {
		s.page = v;
	},
	setPages: (s, v) => {
		s.pages = v;
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

		const page = SchemeController.getPage(pageKey);
		commit('setPage', page);

		return page;
	},
	initPages({commit}) {
		const pages = SchemeController.getPages();
		commit('setPages', pages);

		return pages;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
