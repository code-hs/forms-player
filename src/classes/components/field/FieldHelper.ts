import {validationExample, ComponentParams} from './params';

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

	static generalParams = {
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
		default: () => ({
			placeholder: '',
			hint: '',
		}),
	};

	static styles = {
		type: Object,
		required: false,
		default: () => ({}),
	};

	static html = {
		type: Object,
		required: false,
		default: () => ({}),
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

	static getMultiName(params: ComponentParams) {
		return params?.customParams?.multi?.name || '';
	}
}
