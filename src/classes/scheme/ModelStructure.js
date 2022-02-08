export class ModelStructure {
	/**
	 * Generate a structure for the current page, based on inputs in the schema
	 *
	 * @param {string} page - page structure
	 * @returns {Array}
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

		// the groups first
		return page.groups.reduce((acc, group, groupId) => {
			// if no fields in the group, skip
			if (!this._isHasGroupAnyField(group)) return acc;

			// each group initialize as an array

			acc.push([]);
			// create a store for future fields
			// {} = inputs store
			acc[groupId].push({});

			return acc;
		}, []);
	}

	/**
	 * is field === input
	 *
	 * @param {Object} field
	 * @returns {boolean}
	 * @private
	 */
	static _isFieldInput(fieldOptions) {
		if (!fieldOptions) {
			throw new Error('ModelStructure: _isFieldInput: bad fieldOptions');
		}

		const notInputComponents = ['ButtonSubmit'];
		const fieldComponent = fieldOptions.generalParams.component;

		return !notInputComponents.includes(fieldComponent);
	}

	/**
	 *
	 * @param {Array} fields
	 * @returns {Array}
	 * @private
	 */
	static _filtrateFields(fields) {
		if (!fields) return false;

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
