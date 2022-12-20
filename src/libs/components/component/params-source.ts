import {
	AttrsParams,
	CustomParams,
	HtmlParams,
	StylesParams,
	TextParams,
	ValidationParams,
} from '@/libs/scheme/scheme-structure';

export const customExample: CustomParams = {};
export const attrsExample: AttrsParams = {
	container: {},
	component: {},
};
export const attrsOnlyContainerExample: AttrsParams = {
	container: {},
};
export const stylesExample: StylesParams = {};
export const htmlExample: HtmlParams = {};
export const textExample: TextParams = {
	placeholder: '',
	hint: '',
};
export const validationExample: ValidationParams = {
	required: false,
	pattern: '',
	requiredOnlyIfVisible: false,
	texts: {},
};
