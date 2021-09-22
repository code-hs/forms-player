import SchemeFiltration from './scheme/SchemeFiltration';

// noinspection JSValidateTypes
class Scheme {
	constructor() {
		this.data = null;
	}

	load() {
		// в будущем будет передаваться параметр id, и мы загружает необходимый нам файл схемы
		// eslint-disable-next-line no-undef
		let data = require('../schemes/index.json');

		// is valid scheme
		if (!this.isValidScheme(data)) return false;

		data = SchemeFiltration.filtrateParamEnable(data);
		this.data = data;

		return data;
	}

	isValidScheme(oData) {
		return oData && Object.keys(oData).length;
	}

	getPage(urlHash) {
		if (!this.data || !this.data.pages) return false;

		return this.data.pages.find(p => p.url === urlHash);
	}

	static generateInputStructure(page) {
		if (!page || !page.groups) return [];

		return page.groups.reduce((acc, group, groupId) => {
			if (!group.fieldsets) return acc;

			acc.push([]);

			// а потом и по fieldset, и генерируем схему для значений инпутов
			for (const fieldset of group.fieldsets) {
				if (!('fields' in fieldset)) continue;
				// {} = input store
				acc[groupId].push({});
			}

			return acc;
		}, []);
	}
}

export default Scheme;
