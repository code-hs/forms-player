export class i18n {
	static getText(key, options) {
		console.dir(this);
		const byLang = options.translations[options.lang];
		const keysParts = key.split('.');

		return keysParts.reduce((sourceObject, field) => {
			if (sourceObject[field]) return sourceObject[field];
		}, byLang);
	}

	static install(Vue) {
		const options = {
			lang: 'en',
			translations: {
				en: {
					'app-title': 'My Appy Apperson',
					lead: 'Welcome to my little spot on the interwebs!',
				},
				fr: {
					'app-title': 'Mon Appy Appy',
					lead: 'Bienvenue dans mon petit coin sur les interwebs!',
				},
			},
		};

		Vue.prototype.$t = key => this.getText(key, options);
		Vue.prototype.updateLang = newLang => {
			options.lang = newLang;
		};
	}
}
