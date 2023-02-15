import {Field, Variables} from '@/libs/scheme/scheme.types';
import {SchemeController} from '@/libs/scheme/scheme-controller';
import {FieldThis} from './field-structure';
import {generateStr} from '@/utils/random';

export class FieldL {
	static getMultiName(field: Field): string {
		return field?.custom?.multi?.name || '';
	}

	static variabling(inputVal: string): any {
		// noinspection SuspiciousTypeOfGuard
		if (typeof inputVal !== 'string') return inputVal;
		if (!inputVal.startsWith('$:')) return inputVal;

		const name: string = inputVal.replace('$:', '');
		const variables: Variables | undefined = SchemeController.getConfig().variables;
		// @ts-ignore
		const output: any = variables[name];
		if (!output) {
			throw new Error(`FieldL.variabling: variable ${name} is not defined`);
		}

		return output;
	}

	static isVisible(elem: Element): boolean {
		// is visible on html page, not visible on screen
		const rect = elem.getBoundingClientRect();
		// noinspection OverlyComplexBooleanExpressionJS
		return (
			rect.top !== 0 ||
			rect.bottom !== 0 ||
			rect.left !== 0 ||
			rect.right !== 0 ||
			rect.width !== 0 ||
			rect.height !== 0 ||
			rect.x !== 0 ||
			rect.y !== 0
		);
	}

	static generateNameValue(field: FieldThis) {
		// generate random value for input tag name
		// inputs that have the same name value are grouped together
		// and need stop that behavior
		const mb: string = field.multiboxName || '';
		// if index = 0 -> '0' not the empty string ''
		const mbIndex: string = field.multiboxIndex.toString() || '';
		const model: string = field.common.model || '';
		const rnd: string = generateStr(3);

		return `${mb}.${mbIndex}.${model}.${rnd}`;
	}
}
