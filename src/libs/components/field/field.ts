import {
	validationExample,
	textExample,
	stylesExample,
	htmlExample,
	attrsExample,
} from '@/libs/components/field/field-structure';
import {Field, Variables} from '@/libs/scheme/scheme-structure';
import {SchemeController} from '@/libs/scheme/scheme-controller';

type VueComponentParams = Object;

export class FieldL {
	static multiboxIndex: VueComponentParams = {
		type: Number,
		required: false,
		default: -1,
	};

	static virtualKey: VueComponentParams = {
		type: Number,
		required: true,
	};

	static common: VueComponentParams = {
		type: Object,
		required: true,
	};

	static attrs: VueComponentParams = {
		type: Object,
		required: false,
		default: () => attrsExample,
	};

	static validation: VueComponentParams = {
		type: Object,
		required: false,
		default: () => validationExample,
	};

	static text: VueComponentParams = {
		type: Object,
		required: false,
		default: () => textExample,
	};

	static styles: VueComponentParams = {
		type: Object,
		required: false,
		default: () => stylesExample,
	};

	static html: VueComponentParams = {
		type: Object,
		required: false,
		default: () => htmlExample,
	};

	static components: VueComponentParams = {
		type: Array,
		required: false,
		default: () => [],
	};

	static plugO: VueComponentParams = {
		type: Object,
	};

	static plugN: VueComponentParams = {
		type: Number,
	};

	static getMultiName(field: Field): string {
		return field?.custom?.multi?.name || '';
	}

	static variabling(inputVal: string): any {
		// noinspection SuspiciousTypeOfGuard
		if (typeof inputVal !== 'string') return inputVal;
		if (!inputVal.startsWith('$:')) return inputVal;

		const name: string = inputVal.replace('$:', '');
		const variables: Variables | undefined =
			SchemeController.getConfig().variables;
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
}
