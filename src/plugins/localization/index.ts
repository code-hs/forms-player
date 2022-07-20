// @ts-ignore
import store from '@/store';
import {getValueByStringKey} from '@/utils/objects';
import {LocalizationLoader} from './LocalizationLoader';
import {Locales, LocalizationInformation} from './Structure';

export class Localization {
	static locales: Locales = {};
	static defaultLang: string = '';
	static availableLangs: string[] = [];
	static langsInLocales: string[] = [];

	/**
	 * @param Vue - vue instance
	 */
	static install(Vue: any): void {
		this.loadData();

		if (!this.isAllowedLang(this.defaultLang)) {
			throw new Error(
				`Localization.install: defaultLang '${this.defaultLang}' is not correct, or is not available`
			);
		}

		Vue.prototype.$t = (key: string) => this.getText(key);
		Vue.prototype.localization = this;
	}

	static loadData(): void {
		const data: LocalizationInformation = LocalizationLoader.getData();
		// setup fields
		this.locales = data.locales;

		if (
			data.configuration.availableLangs &&
			data.configuration.availableLangs.length
		) {
			this.availableLangs = data.configuration.availableLangs.map(
				(lang: string) => lang.toLowerCase()
			);
		}

		this.langsInLocales = Object.keys(this.locales).map(lang =>
			lang.toLowerCase()
		);
		this.defaultLang = data.configuration.defaultLang || '';
	}

	/**
	 * init language from app.vue
	 * or use default language (from scheme config)
	 */
	static init(langFromAttribute: string): void {
		const lang: string = langFromAttribute || this.defaultLang;
		if (lang) {
			this.changeLanguage(lang);
		}
	}

	/**
	 * @param key - like 'foo.boo.bar'
	 */
	static getText(key: string): string {
		const currentLanguage: string =
			store.getters['localization/currentLanguage'];

		if (!key || !currentLanguage) return '';

		// if key starts from '!', return this text
		if (key.startsWith('!')) {
			return key.substr(1);
		}

		const localesByLang = this.locales[currentLanguage];

		return getValueByStringKey(key, localesByLang);
	}

	static isAllowedLang(lang: string): boolean {
		// eslint-disable-next-line no-param-reassign
		lang = lang.toLowerCase();

		return (
			this.langsInLocales.includes(lang) && this.availableLangs.includes(lang)
		);
	}

	static changeLanguage(lang: string): void {
		// eslint-disable-next-line no-param-reassign
		lang = lang.toLowerCase();

		if (!this.isAllowedLang(lang)) {
			console.warn(
				`Localization.changeLanguage: language '${lang}' is not allowed`
			);
			return;
		}

		store.commit('localization/setCurrentLanguage', lang);
	}
}
