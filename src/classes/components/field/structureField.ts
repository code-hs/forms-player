import {
	CustomParams,
	HtmlParams,
	StylesParams,
	TextParams,
	ValidationParams,
} from '@/classes/scheme/structure';

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
