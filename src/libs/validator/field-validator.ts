import {ValidationParams} from '@/libs/scheme/scheme-structure';
import {stringToRegex} from '@/utils/regexp';

export class FieldValidator {
	static debounceTime: number = 300;

	static isValid(rules: ValidationParams, fieldValue: string): boolean {
		// if there are no rules in the scheme ->  field becomes valid
		if (!rules || !Object.keys(rules).length) {
			return true;
		}

		if (rules.pattern) {
			try {
				const regexp = stringToRegex(rules.pattern);
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
