import {
	validationExample,
	textExample,
	stylesExample,
	htmlExample,
} from '@/classes/components/field/structureField';
import {Field} from '@/classes/scheme/schemeStructure';

type VueComponentParams = Object;

export class FieldHelper {
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
}
