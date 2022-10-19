import {ValidationParams} from '@/classes/scheme/structure';

export class FieldValidator {
	static debounceTime: number = 300;

	static stringToRegex(str: string): RegExp {
		if (!str) {
			throw new Error(
				'FieldValidator.stringToRegex: source' +
					' string for create regexp is empty'
			);
		}

		// Main regex
		// @ts-ignore
		const main: string = str.match(/\/(.+)\/.*/)[1];
		// Regex options
		// @ts-ignore
		const options: string = str.match(/\/.+\/(.*)/)[1];

		// Compiled regex
		const regexp = new RegExp(main, options);

		if (regexp.constructor.name !== 'RegExp') {
			throw new Error(
				'FieldValidator.stringToRegex: validation pattern (source) is not' +
					' correct type'
			);
		}

		return regexp;
	}

	static isValid(rules: ValidationParams, fieldValue: string): boolean {
		// if there are no rules in the scheme ->  field becomes valid
		if (!rules || !Object.keys(rules).length) {
			return true;
		}

		if (rules.pattern) {
			try {
				const regexp = this.stringToRegex(rules.pattern);
				return regexp.test(fieldValue);
			} catch {
				throw new Error('FieldValidator.isValid: validation pattern is broken');
			}
		} else if ('required' in rules) {
			// if rules have only required
			// if required === true -> check the field

			if (rules.required) return Boolean(fieldValue);

			// if required === false -> return true (valid)
			return true;
		}

		// if no pattern and no required, rules have not useful options
		// -> field valid
		return true;
	}

	static canValidation(
		rules: ValidationParams,
		onlyRequired: boolean = false
	): boolean {
		if (!rules) return false;
		if (onlyRequired) return rules.required as boolean;

		return !!(rules.pattern || rules.required);
	}
}
