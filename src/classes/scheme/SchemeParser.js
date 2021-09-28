import SchemeFiltration from './SchemeFiltration';

// noinspection JSValidateTypes
class SchemeParser {
	schema;

	load() {
		// в будущем будет передаваться параметр id, и мы загружает необходимый нам файл схемы
		// eslint-disable-next-line global-require
		this.schema = require('../../schemes');
		// is valid scheme
		if (!this.isValidScheme()) return false;

		this.schema = SchemeFiltration.filtrateParamEnable(this.schema);

		return this.schema;
	}

	isValidScheme() {
		return this.schema && Object.keys(this.schema).length;
	}

	getPage(urlHash) {
		if (!this.schema || !this.schema.pages) return false;

		return this.schema.pages.find(p => p.url === urlHash);
	}

	static generateInputStructure(page) {
		if (!page || !page.groups) return [];

		return page.groups.reduce((acc, group, groupId) => {
			if (!group.fieldsets) return acc;

			acc.push([]);

			// а потом и по fieldset, и генерируем схему для значений инпутов
			group.fieldsets.forEach(fieldset => {
				// {} = input store
				if ('fields' in fieldset) acc[groupId].push({});
			});

			return acc;
		}, []);
	}
}

export default SchemeParser;
