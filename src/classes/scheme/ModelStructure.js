export class ModelStructure {
	/**
	 * Generate a structure for the current page, based on the page structure
	 * @param {Object} pageStructure
	 * @returns {Object}
	 *
	 * return like
	 * {
	 *	"multi_box_1": [
	 * 		{}
	 * 	],
	 * 	"first": "",
	 * 	"second": "",
	 * 	"surname": ""
	 * }
	 */
	static generate(pageStructure) {
		if (!pageStructure || !pageStructure.components) return false;

		return this._getComponentStructure(pageStructure);
	}

	/**
	 * @param {Object} component - from scheme (field or layout item)
	 * @returns {{}}
	 * @private
	 */
	static _getComponentStructure(component) {
		const optionalStructure = this._getOptionalStructure(component);
		const innerStructure = this._getInnerStructure(component);

		return {...optionalStructure, ...innerStructure};
	}

	/**
	 * @param {Object} component - from scheme (field or layout item)
	 * @returns {{}}
	 * @private
	 */
	static _getOptionalStructure(component) {
		const structure = {};

		if (component?.generalParams?.component === 'MultiBox') {
			// create a store for future fields
			const inputsStore = {};
			const multiBoxModel = component.generalParams.model;

			structure[multiBoxModel] = [inputsStore];
		}

		return structure;
	}

	/**
	 * @param {Object} component - from scheme (field or layout item)
	 * @returns {{}}
	 * @private
	 */
	static _getInnerStructure(component) {
		if (!component?.components?.length) return {};

		return component.components.reduce((store, child) => {
			const childStructure = this._getComponentStructure(child);

			return {...store, ...childStructure};
		}, {});
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
}
