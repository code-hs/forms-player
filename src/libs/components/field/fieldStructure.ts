import {
	CustomParams,
	HtmlParams,
	StylesParams,
	TextParams,
	ValidationParams,
} from '@/libs/scheme/schemeStructure';

export interface FieldThis {
	[key: string]: any;
}

export const customExample: CustomParams = {};
export const stylesExample: StylesParams = {};
export const htmlExample: HtmlParams = {};
export const textExample: TextParams = {
	placeholder: '',
	hint: '',
};
export const validationExample: ValidationParams = {
	required: false,
	pattern: '',
	texts: {},
};
