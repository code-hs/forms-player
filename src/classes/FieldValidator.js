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
	 *
	 * @param validationRules - validation options
	 */
	// eslint-disable-next-line no-unused-vars
	static generatePattern(validationRules) {
		// console.log(+validationRules);
	}

	static isValid(validationRules, fieldValue) {
		if (
			!validationRules ||
			!Object.keys(validationRules).length ||
			!fieldValue
		) {
			return false;
		}

		const pattern =
			validationRules.pattern || this.generatePattern(validationRules);

		try {
			const regexp = this.stringToRegex(pattern);

			return regexp.test(fieldValue);
		} catch {
			throw new Error('bad validation pattern');
		}
	}
}
