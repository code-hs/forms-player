import {
	validationExample,
	textExample,
	stylesExample,
	htmlExample,
	attrsExample,
	attrsOnlyContainerExample,
} from './params-source';

type VueComponentParams = Object;

export class ComponentParams {
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

	static attrsOnlyContainer: VueComponentParams = {
		type: Object,
		required: false,
		default: () => attrsOnlyContainerExample,
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
}
