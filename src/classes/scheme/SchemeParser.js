class SchemeParser {
	schema;

	load(mode) {
		const storageKey = 'WDFL:init:schemeStructure';

		if (mode === 'dev') {
			// если запускается build в dev режиме
			// eslint-disable-next-line global-require
			this.schema = require('../../schemes');
		} else {
			this.schema = localStorage.getItem(storageKey);
			this.schema = JSON.parse(this.schema);
		}
		// is valid scheme
		if (!this.isValidScheme()) return false;

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
