const state = () => ({
	currentLanguage: '',
});

const getters = {
	currentLanguage: s => s.currentLanguage,
};

const mutations = {
	/**
	 * @param {string} v - language code
	 */
	setCurrentLanguage: (s, v) => {
		s.currentLanguage = v;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
};
