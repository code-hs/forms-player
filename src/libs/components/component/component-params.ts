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

	static multiboxIndex: VueComponentParams = {
		type: Number,
		required: false,
		default: -1,
	};

	static virtualKey: VueComponentParams = {
		type: Number,
		required: false,
	};

	static plugO: VueComponentParams = {
		type: Object,
	};

	static plugN: VueComponentParams = {
		type: Number,
	};

	static getAllParams() {
		return {
			common: this.common,
			custom: this.plugO,
			attrs: this.attrs,

			text: this.text,
			html: this.html,
			styles: this.styles,

			validation: this.validation,
			virtualKey: this.virtualKey,
			multiboxIndex: this.multiboxIndex,

			components: this.components,
			module: this.plugO,
		};
	}
}
