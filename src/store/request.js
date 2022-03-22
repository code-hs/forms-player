import {Api} from '../classes/api/Api';

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
	 * @param {Object} pageStructure - current page structure
	 * @param {Object} values - store model/structure
	 */
	async saveFormValues({commit}, {pageStructure, values}) {
		const url = 'form/save-form';
		const sendData = {
			...Api.getProjectInfo(),
			pageKey: pageStructure.key,
			values,
		};

		commit('setSaveFormFinished', false);
		const res = await Api.axios.post(url, sendData);
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
