import {Api} from '@/libs/api/api';
// eslint-disable-next-line no-unused-vars
import {ModelStructureStore} from '@/libs/model/model-structure';
// eslint-disable-next-line no-unused-vars
import {Page} from '@/libs/scheme/scheme.types';
import {Submitter} from '../libs/api/submitter';
import {ApiResponser} from '../libs/api/api-responser';

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
	 * @param {ModelStructureStore} values - store model/structure
	 */
	async submitForm({commit}, {page, values}) {
		commit('setSaveFormFinished', false);

		// noinspection JSCheckFunctionSignatures
		const submitter = new Submitter(page, values);
		const url = submitter.getUrl();
		if (!url) {
			commit('setSaveFormFinished', true);
			return ApiResponser.getSuccess();
		}

		const res = await Api.post(url, {
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
