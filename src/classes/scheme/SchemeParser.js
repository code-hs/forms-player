/* eslint-disable global-require,max-len */
// noinspection JSUnresolvedFunction,JSIncompatibleTypesComparison

class SchemeParser {
	schema;

	load() {
		if (process.env.CUSTOM_RUN_COMMAND === 'serve') {
			// при запуске через serve,
			// схема берется из папки в апи
			// так как нужен HRM, а для этого все должно быть подключено напрямую
			// для прод билда, коментить эти блоки
			this.schema = require('../../../../api/classes/scheme/tempSource/mainSchemeStructure.json');
			const SchemaFiltrator = require('../../../../api/classes/scheme/SchemeFiltrator');
			this.schema = SchemaFiltrator.filtrateParamEnable(this.schema);
		} else {
			// loader сделал запрос по апи и получил схему
			// loader и записал в localStorage
			const storageKey = 'WDFL:init:schemeStructure';
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

	/**
	 * Генерирует структуру для текущей страницы
	 * структура из себя представляет вложенный массив со всеми инпутами
	 *
	 * @param page - page structure
	 * @returns {[]}
	 */
	static generateInputsStructure(page) {
		if (!page || !page.groups) return [];

		// сначала проходим по группам
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
