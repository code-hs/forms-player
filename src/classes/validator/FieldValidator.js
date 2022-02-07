export class FieldValidator {
	static stringToRegex(str) {
		if (!str) throw new Error('empty source string for create regexp');
		// Main regex
		const main = str.match(/\/(.+)\/.*/)[1];
		// Regex options
		const options = str.match(/\/.+\/(.*)/)[1];

		// Compiled regex
		const regexp = new RegExp(main, options);

		if (regexp.constructor.name !== 'RegExp') {
			throw new Error('bad validation pattern (source)');
		}

		return regexp;
	}

	/**
	 * is valid field value by rules
	 *
	 * @param {Object} validationRules
	 * @param fieldValue
	 * @returns {boolean}
	 */
	static isValid(validationRules, fieldValue) {
		// if there are no rules in the schema ->  field becomes valid
		if (!validationRules || !Object.keys(validationRules).length) {
			return true;
		}

		if (validationRules.pattern) {
			try {
				const regexp = this.stringToRegex(validationRules.pattern);
				return regexp.test(fieldValue);
			} catch {
				throw new Error('bad validation pattern');
			}
		} else if ('required' in validationRules) {
			// if rules have only required
			// if required === true -> check the field
			// if required === false -> return true (valid)
			return validationRules.required ? Boolean(fieldValue) : true;
		}

		// if no pattern and no required, rules have not useful options
		// -> field valid
		return true;
	}

	static flatStructure(structure) {
		const flattedStructure = structure.flat(9);

		// transform fieldset item from object to array
		// and give all data by field
		const fieldsDataInArray = flattedStructure.map(fieldset =>
			Object.entries(fieldset).map(field => field[1])
		);

		// flatting groups
		return fieldsDataInArray.flat(9);
	}

	static hasStructureErrorInput(structure) {
		const fieldsFlatted = this.flatStructure(structure);
		// if at least one field has an error
		return fieldsFlatted.some(field => field.error);
	}
}
