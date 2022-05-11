export class ModelStructure {
	/**
	 * Generate a structure for the current page, based on the page structure
	 * @param {Object} pageStructure
	 * @returns {Array[]}
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
	static generate(pageStructure) {
		if (!pageStructure || !pageStructure.groups) return [];

		// the groups first
		return pageStructure.groups.reduce((acc, group, groupId) => {
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

	static generate2(pageStructure) {
		if (!pageStructure || !pageStructure.components) return [];

		const output = this.getComponentStructure(pageStructure);

		// console.logp(output);

		return output;
	}

	static getComponentStructure(component) {
		let output = {};

		// console.logp(component);

		if (component?.generalParams?.component === 'MultiBox') {
			const path = component.generalParams.model;
			output[path] = [{}];
		}

		if (component?.components?.length) {
			component.components.forEach(component => {
				if (component.generalParams.component === 'layoutColumns') {
					const {components} = component;

					components.forEach(compItem => {
						const r = this.getComponentStructure(compItem);

						output = {...output, ...r};
					});
				} else {
					const r = this.getComponentStructure(component);
					output = {...output, ...r};
				}
			});
		}

		return output;
	}

	/**
	 * is field === input
	 * @param {Object} field
	 * @returns {boolean}
	 * @private
	 */
	static _isFieldInput(fieldOptions) {
		// console.log(fieldOptions.generalParams?.component);

		if (!fieldOptions) {
			throw new Error('ModelStructure._isFieldInput: bad fieldOptions');
		}

		if (!fieldOptions.generalParams || !fieldOptions.generalParams.component) {
			throw new Error(
				"ModelStructure._isFieldInput: need field 'component' in" +
					' generalParams object'
			);
		}

		const notInputComponents = ['ButtonSubmit'];
		const fieldComponent = fieldOptions.generalParams.component;

		return !notInputComponents.includes(fieldComponent);
	}

	/**
	 * @param {Array} fields
	 * @returns {Array}
	 * @private
	 */
	static _filtrateFields(fields) {
		if (!fields) return false;

		return fields.filter(field => this._isFieldInput(field));
	}

	/**
	 * @param {Object} group
	 * @returns {boolean}
	 * @private
	 */
	static _isHasGroupAnyField(group) {
		const {fieldsets} = group;
		if (!fieldsets) return false;

		// eslint-disable-next-line no-restricted-syntax
		for (const fieldset of fieldsets) {
			const {rows} = fieldset;
			if (!rows) return false;

			if (this._isHasRowsAnyField(rows)) return true;
		}

		return false;
	}

	/**
	 * @param {Object} rows
	 * @returns {boolean}
	 * @private
	 */
	static _isHasRowsAnyField(rows) {
		// eslint-disable-next-line no-restricted-syntax
		for (const row of rows) {
			let fields = JSON.parse(JSON.stringify(row.fields));
			fields = this._filtrateFields(fields);

			// is group has eny field
			if (fields && fields.length) return true;
		}

		return false;
	}
}
