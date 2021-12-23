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
	 * [ group items
	 *  [ fieldset items
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
			// если в группе нету полей, пропускаем
			if (!this._isHasGroupAnyField(group)) return acc;

			// каждую группу инициализируем как массив
			acc.push([]);
			// создаем store для будущих полей
			// {} = inputs store
			acc[groupId].push({});

			return acc;
		}, []);
	}

	static _isFieldInput(field) {
		const notFieldsComponents = ['ButtonSubmit'];

		return !notFieldsComponents.includes(field.component);
	}

	static _filtrateFields(fields) {
		return fields.filter(field => this._isFieldInput(field));
	}

	static _isHasGroupAnyField(group) {
		const {fieldsets} = group;
		if (!fieldsets) return false;

		for (const fieldset of fieldsets) {
			const {rows} = fieldset;
			if (!rows) return false;

			for (const row of rows) {
				let fields = JSON.parse(JSON.stringify(row.fields));
				fields = this._filtrateFields(fields);

				if (fields && fields.length) return true;
			}
		}

		return false;
	}
}

export default SchemeParser;
