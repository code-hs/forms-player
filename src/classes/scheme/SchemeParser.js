/* eslint-disable global-require,max-len,no-restricted-syntax */
// noinspection JSUnresolvedFunction,JSIncompatibleTypesComparison,GrazieInspection

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
	 *
	 * return like
	 * [
	 *  [
	 *   {},
	 *   {},
	 *   {}
	 *  ]
	 * ]
	 */
	static generateModelStructure(page) {
		if (!page || !page.groups) return [];

		// сначала проходим по группам
		return page.groups.reduce((acc, group, groupId) => {
			// каждую группу инициализируем как массив
			acc.push([]);

			// если хоть одно поле есть в текущей группе,
			// то создаем store для будущих полей
			// {} = inputs store
			if (this._isHasGroupAnyField(group)) acc[groupId].push({});

			return acc;
		}, []);
	}

	static _isHasGroupAnyField(group) {
		const {fieldsets} = group;
		if (!fieldsets) return false;

		for (const fieldset of fieldsets) {
			const {rows} = fieldset;
			if (!rows) return false;

			for (const row of rows) {
				const {fields} = row;

				if (fields && fields.length) return true;
			}
		}

		return false;
	}
}

export default SchemeParser;
