import {Api} from '@/libs/api/api';
// eslint-disable-next-line no-unused-vars
import {ModelStructure} from '@/libs/model/model-structure';
// eslint-disable-next-line no-unused-vars
import {Page} from '@/libs/scheme/scheme-structure';

const state = () => ({
	saveFormFinished: true,
});

const getters = {
	saveFormFinished: s => s.saveFormFinished,
};

const mutations = {
	setSaveFormFinished: (s, v) => {
		s.saveFormFinished = v;
	},
};

const actions = {
	/**
	 * @param {Page} page - current page structure
	 * @param {ModelStructure} values - store model/structure
	 */
	async saveFormValues({commit}, {page, values}) {
		commit('setSaveFormFinished', false);
		const res = await Api.post('form/save-form', {
			pageKey: page.key,
			values,
		});
		commit('setSaveFormFinished', true);

		return res;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
