import {
	AttrsParams,
	CustomParams,
	HtmlParams,
	StylesParams,
	TextParams,
	ValidationParams,
} from '@/libs/scheme/scheme.types';

// this file, use only in the component-params.ts file
// only!!

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
	label: '',
};
export const validationExample: ValidationParams = {
	required: false,
	pattern: '',
	requiredOnlyIfVisible: false,
	texts: {},
};
