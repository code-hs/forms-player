export class FieldPropser {
	static multiboxIndex = {
		type: Number,
		required: false,
		default: -1,
	};

	static itemKey = {
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
		default: () => ({
			required: false,
			pattern: '',
			errorText: '',
		}),
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
}
