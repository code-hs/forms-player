import SchemeFiltration from './SchemeFiltration';

// noinspection JSValidateTypes
class SchemeParser {
	oSchema;

	load() {
		// в будущем будет передаваться параметр id, и мы загружает необходимый нам файл схемы
		// eslint-disable-next-line global-require
		this.oSchema = require('../../schemes');
		// is valid scheme
		if (!this.isValidScheme()) return false;

		this.oSchema = SchemeFiltration.filtrateParamEnable(this.oSchema);

		return this.oSchema;
	}

	isValidScheme() {
		return this.oSchema && Object.keys(this.oSchema).length;
	}

	getPage(urlHash) {
		if (!this.oSchema || !this.oSchema.pages) return false;

		return this.oSchema.pages.find(p => p.url === urlHash);
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
