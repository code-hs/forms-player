// @ts-ignore
import store from '@/store';
import {getValueByStringKey} from '@/utils/objects';
import {LocalizationLoader} from './localization-loader';
import {LocalesAllLanguages, Locales, LocalizationInformation} from './structure';

export class Localization {
	static locales: LocalesAllLanguages = {};
	static defaultLang: string = '';
	static availableLangs: string[] = [];
	static langsInLocales: string[] = [];

	/**
	 * @param Vue - vue instance
	 */
	static install(Vue: any): void {
		this.loadData();

		Vue.prototype.$t = (key: string) => this.getText(key);
		Vue.prototype.localization = this;

		if (!this.canUseLang(this.defaultLang)) {
			console.error(
				`Localization.install: defaultLang in scheme, '${this.defaultLang}' is not correct, or is not available, can't install module languages`
			);
		}
	}

	static loadData(): void {
		const data: LocalizationInformation = LocalizationLoader.getData();
		if (!data.configuration || !data.locales) return;
		// setup fields
		this.locales = data.locales;

		if (data.configuration.availableLangs && data.configuration.availableLangs.length) {
			this.availableLangs = data.configuration.availableLangs.map((lang: string) =>
				lang.toLowerCase()
			);
		}

		this.langsInLocales = Object.keys(this.locales).map(lang => lang.toLowerCase());
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
		const currentLanguage: string = this.getLang();

		if (!key) return '';

		// if key starts from '#', return this text
		if (key.startsWith('#')) {
			// noinspection JSDeprecatedSymbols
			return key.substr(1);
		}

		if (!currentLanguage) return '';
		const localesByLang: Locales = this.locales[currentLanguage];

		return getValueByStringKey(key, localesByLang);
	}

	static changeLanguage(lang: string): void {
		// eslint-disable-next-line no-param-reassign
		lang = lang.toLowerCase();

		if (!this.canUseLang(lang)) {
			console.warn(
				`Localization.changeLanguage: language '${lang}' can't find in locales or cant find in array scheme.config.localization.availableLangs`
			);
			return;
		}

		store.commit('localization/setCurrentLanguage', lang);
	}

	static getLang(): string {
		// return static value
		return store.getters['localization/currentLanguage'];
	}

	private static canUseLang(lang: string): boolean {
		// eslint-disable-next-line no-param-reassign
		lang = lang.toLowerCase();

		return this.langsInLocales.includes(lang) && this.availableLangs.includes(lang);
	}
}
