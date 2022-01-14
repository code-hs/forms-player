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

	static isValid(validationRules, fieldValue) {
		if (!validationRules || !Object.keys(validationRules).length) {
			return true;
		}

		if ('required' in validationRules && !validationRules.pattern) {
			if (validationRules.required) return Boolean(fieldValue);
			return true;
		}

		try {
			const regexp = this.stringToRegex(validationRules.pattern);

			return regexp.test(fieldValue);
		} catch {
			throw new Error('bad validation pattern');
		}
	}
}
