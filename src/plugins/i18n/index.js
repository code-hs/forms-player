import store from '../../store';

export class i18n {
	dictionary = {};
	defaultLanguage = '';

	static install(Vue) {
		this.loadData();

		Vue.prototype.$t = key => this.getText(key);
		Vue.prototype.i18n = this;
	}

	static loadData() {
		let data = localStorage.getItem('WDFL:init:localization');
		if (!data) {
			throw new Error('i18n: loadData: bad localization');
		}

		data = JSON.parse(data);
		this.dictionary = data.dictionary;
		this.defaultLanguage = data.defaultLanguage;
	}

	/**
	 * Main process function
	 * @param key - like 'foo.boo.bar'
	 * @returns {string}
	 */
	static getText(key) {
		if (!key) return '';

		const currentLanguage = store.getters['localization/currentLanguage'];
		const localesStore = this.dictionary[currentLanguage];

		return this.getValueByStringKey(key, localesStore);
	}

	/**
	 * Get value by string key in deep object
	 * @param {string} key - like 'foo.boo.bar'
	 * @param {Object} localesStore
	 * @returns {string} text from dictionary
	 */
	static getValueByStringKey(key, localesStore) {
		// ['foo', 'boo', 'bar']
		const keysParts = key.split('.');

		return keysParts.reduce(
			(accObject, field) => (accObject[field] ? accObject[field] : ''),
			localesStore
		);
	}

	/**
	 * @param {string} lang  - language code AB
	 */
	static changeLanguage(lang) {
		// is allowed language
		if (!Object.keys(this.dictionary).includes(lang)) return;

		// noinspection JSCheckFunctionSignatures
		store.commit('localization/setCurrentLanguage', lang);
	}
}
