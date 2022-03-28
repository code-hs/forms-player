const state = () => ({
	currentLanguage: 'en',
});

const getters = {
	currentLanguage: s => s.currentLanguage,
};

const mutations = {
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
