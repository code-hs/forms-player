import {ValidationParams} from '@/libs/scheme/scheme.types';
import {FieldThis} from '@/libs/components/field/field.types';
import {FieldL as FL} from '@/libs/components/field/field';
import {RulesValidator} from '@/libs/validator/rules-validator';

export class FieldValidator {
	static debounceTime: number = 300;

	static validate(rules: ValidationParams, fieldValue: string): string {
		// if there are no rules in the scheme ->  field becomes valid
		if (!this.hasRules(rules)) return '';

		const rulesValidator = new RulesValidator(rules, fieldValue);
		try {
			if (!rulesValidator.isValidRequired()) {
				// Can't find error text, ' ' - fix for show error,
				// because empty string not show error, need some text, invisible space.
				return rules.texts?.required || ' ';
			} else if (!rulesValidator.isValidPattern()) {
				return rules.texts?.pattern || ' ';
			}
		} catch (e) {
			console.error('FieldValidator.validate: ', e);
		}

		return '';
	}

	private static hasRules(rules: ValidationParams): boolean {
		return Boolean(rules && Object.keys(rules).length);
	}

	static canValidation(rules: ValidationParams, onlyRequired: boolean = false): boolean {
		if (!rules) return false;
		if (onlyRequired) return rules.required as boolean;

		return !!(rules.pattern || rules.required);
	}

	static isSkipTaskByOptionsReqOnlyIfVis(field: FieldThis, element: Element): boolean {
		if (!field || !element) return false;

		return (field.requiredOnlyIfVisible && !FL.isVisible(element)) as boolean;
	}
}
