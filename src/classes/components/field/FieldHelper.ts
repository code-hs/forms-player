import {
	validationExample,
	textExample,
	stylesExample,
	htmlExample,
	Field,
} from '@/classes/scheme/structure';

export class FieldHelper {
	static multiboxIndex = {
		type: Number,
		required: false,
		default: -1,
	};

	static virtualKey = {
		type: Number,
		required: true,
	};

	// like CommonParams (from file scheme/structure.ts)
	static common = {
		type: Object,
		required: true,
	};

	static validation = {
		type: Object,
		required: false,
		default: () => validationExample,
	};

	static text = {
		type: Object,
		required: false,
		default: () => textExample,
	};

	static styles = {
		type: Object,
		required: false,
		default: () => stylesExample,
	};

	static html = {
		type: Object,
		required: false,
		default: () => htmlExample,
	};

	static components = {
		type: Array,
		required: false,
		default: () => [],
	};

	static plugO = {
		type: Object,
	};

	static plugN = {
		type: Number,
	};

	static getMultiName(field: Field) {
		return field?.customParams?.multi?.name || '';
	}
}
