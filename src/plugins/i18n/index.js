import store from '../../store';

const dictionary = {
	en: {
		'app-title': 'My Appy Apperson',
		lead: 'Welcome to my little spot on the interwebs!',
	},
	fr: {
		'app-title': 'Mon Appy Appy',
		lead: 'Bienvenue dans mon petit coin sur les interwebs!',
	},
};

export class i18n {
	static changeLanguage(lang) {
		store.commit('localization/setCurrentLanguage', lang);
	}

	static getValueByStringKey(key, localesStore) {
		const keysParts = key.split('.');

		return keysParts.reduce(
			(accObject, field) => (accObject[field] ? accObject[field] : ''),
			localesStore
		);
	}

	static getText(key) {
		if (!key) return '';

		const currentLanguage = store.getters['localization/currentLanguage'];
		const localesStore = dictionary[currentLanguage];

		return this.getValueByStringKey(key, localesStore);
	}

	// eslint-disable-next-line no-unused-vars
	static install(Vue, options) {
		Vue.prototype.$t = key => this.getText(key);
		Vue.prototype.i18n = this;
	}
}
