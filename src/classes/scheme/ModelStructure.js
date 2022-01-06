class ModelStructure {
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
	static generate(page) {
		if (!page || !page.groups) return [];

		// сначала проходим по группам
		return page.groups.reduce((acc, group, groupId) => {
			// если в группе нет полей, пропускаем
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

		return !notFieldsComponents.includes(field.generalParams.component);
	}

	static _filtrateFields(fields) {
		return fields.filter(field => this._isFieldInput(field));
	}

	static _isHasGroupAnyField(group) {
		const {fieldsets} = group;
		if (!fieldsets) return false;

		// eslint-disable-next-line no-restricted-syntax
		for (const fieldset of fieldsets) {
			const {rows} = fieldset;
			if (!rows) return false;

			// eslint-disable-next-line no-restricted-syntax
			for (const row of rows) {
				let fields = JSON.parse(JSON.stringify(row.fields));
				fields = this._filtrateFields(fields);

				if (fields && fields.length) return true;
			}
		}

		return false;
	}
}

export default ModelStructure;
