import store from '../../store';
import {getValueByStringKey} from '../../utils/objects';
import {LocalizationLoader} from './LocalizationLoader';

export class Localization {
	dictionaries = {};
	defaultLang = '';
	/**
	 * @type {[String, String]}
	 */
	availableLangs = [];

	/**
	 * @param Vue - vue instance
	 */
	static install(Vue) {
		this.loadData();

		if (!this.isAllowedLang(this.defaultLang)) {
			throw new Error(
				`Localization.install: defaultLang '${this.defaultLang}' is not correct, or is not available`
			);
		}
		// set the started language, that customer set in scheme
		// noinspection JSCheckFunctionSignatures
		store.commit('localization/setCurrentLanguage', this.defaultLang);

		Vue.prototype.$t = key => this.getText(key);
		Vue.prototype.localization = this;
	}

	static loadData() {
		const data = LocalizationLoader.getData();
		// setup fields
		this.dictionaries = data.dictionaries;
		this.availableLangs = data.configuration.availableLangs.map(lang =>
			lang.toLowerCase()
		);
		this.defaultLang = data.configuration.defaultLang;
	}

	/**
	 * if client set language, we will use it.
	 * or use default language (from scheme config)
	 * @param {string} langFromAttribute
	 */
	static init(langFromAttribute) {
		if (langFromAttribute) {
			this.changeLanguage(langFromAttribute);
		}
	}

	/**
	 * Main process function
	 * @param key - like 'foo.boo.bar'
	 * @returns {string}
	 */
	static getText(key) {
		if (!key) return '';

		const currentLanguage = store.getters['localization/currentLanguage'];
		const dictionaryByLang = this.dictionaries[currentLanguage];

		return getValueByStringKey(key, dictionaryByLang);
	}

	/**
	 * @param {string} lang - like 'en'
	 * @returns {boolean}
	 */
	static isAllowedLang(lang) {
		lang = lang.toLowerCase();
		const langsInDictionaries = Object.keys(this.dictionaries).map(lang =>
			lang.toLowerCase()
		);

		return (
			langsInDictionaries.includes(lang) && this.availableLangs.includes(lang)
		);
	}

	/**
	 * @param {string} lang  - language code ab
	 */
	static changeLanguage(lang) {
		lang = lang.toLowerCase();
		if (!this.isAllowedLang(lang)) {
			console.warn(
				`Localization.changeLanguage: language '${lang}' is not allowed`
			);
			return;
		}

		// noinspection JSCheckFunctionSignatures
		store.commit('localization/setCurrentLanguage', lang);
	}
}
