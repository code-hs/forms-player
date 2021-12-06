/* eslint-disable global-require,max-len */
// noinspection JSUnresolvedFunction,JSIncompatibleTypesComparison

class SchemeParser {
	structure;

	load() {
		if (process.env.CUSTOM_RUN_COMMAND === 'serve') {
			// при запуске через serve,
			// схема берется из папки в апи
			// так как нужен HRM, а для этого все должно быть подключено напрямую
			// для прод билда, коментить эти блоки
			this.structure = require('../../../../api/classes/scheme/tempSource/mainSchemeStructure.json');
			const SchemaFiltrator = require('../../../../api/classes/scheme/SchemeFiltrator');
			this.structure = SchemaFiltrator.filtrateParamEnable(this.structure);
		} else {
			// loader сделал запрос по апи и получил схему
			// loader и записал в localStorage
			const storageKey = 'WDFL:init:schemeStructure';
			this.structure = localStorage.getItem(storageKey);
			this.structure = JSON.parse(this.structure);
		}
		// is valid scheme
		if (!this.isValidStructure()) return false;

		return this.structure;
	}

	isValidStructure() {
		return this.structure && Object.keys(this.structure).length;
	}

	getPage(urlHash) {
		if (!this.structure || !this.structure.pages) return false;

		return this.structure.pages.find(p => p.url === urlHash);
	}

	/**
	 * Генерирует структуру для текущей страницы, исходя из расположения
	 * инпутов в схеме
	 *
	 * @param page - page structure
	 * @returns {[]}
	 */
	static generateModelStructure(page) {
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
