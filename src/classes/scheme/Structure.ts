export interface ValidationParams {
	required: boolean;
	pattern: string;
	errorText: string;
}
export const validationExample: ValidationParams = {
	required: false,
	pattern: '',
	errorText: '',
};

export interface CustomParams {
	multi?: {
		name: string;
		key: number;
	};
	[key: string]: any;
}
export const customParamsExample: CustomParams = {};

export interface GeneralParams {
	type: string;
	model?: string;
	enable?: boolean;
}

export interface TextParams {
	placeholder?: string;
	hint?: string;
}
export const textExample: TextParams = {
	placeholder: '',
	hint: '',
};

export interface StylesParams {}
export const stylesExample: StylesParams = {};

export interface HtmlParams {}
export const htmlExample: HtmlParams = {};

export interface Field {
	generalParams: GeneralParams;
	customParams?: CustomParams;
	validation?: ValidationParams;
	text?: TextParams;
	styles?: StylesParams;
	html?: HtmlParams;
	components?: Field[];
}

export interface Page {
	id?: number;
	key?: string;
	type?: string;
	description?: string;
	position?: number;
	components?: Field[];
}

export interface Scheme {
	config: object;
	pages: Page[];
}
