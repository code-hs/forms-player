import {ValidationParams} from '@/libs/scheme/scheme.types';
import {stringToRegex} from '@/utils/regexp';

export class RulesValidator {
	private readonly rules: ValidationParams;
	private readonly fieldValue: string;

	constructor(rules: ValidationParams, fieldValue: string) {
		this.rules = rules;
		this.fieldValue = fieldValue;
	}

	isValidRequired(): boolean {
		// no required -> field valid
		if (!('required' in this.rules)) return true;

		if (this.rules.required) return Boolean(this.fieldValue);

		return true;
	}

	isValidPattern(): boolean {
		// if no pattern and no required, rules have not useful options
		// -> field valid
		if (!this.rules.pattern) return true;

		try {
			const regexp = stringToRegex(this.rules.pattern);
			return regexp.test(this.fieldValue);
		} catch {
			throw new Error('FieldValidateRules.isValidPattern: validation pattern is broken');
		}
	}
}
