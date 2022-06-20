import {Api} from '@/classes/api/Api';

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
	 * @param {Object} page - current page structure
	 * @param {Object} values - store model/structure
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
