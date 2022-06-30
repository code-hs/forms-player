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

export interface CommonParams {
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
	common: CommonParams;
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

export interface LocalizationConfig {
	defaultLang?: string;
	availableLangs?: string[];
}
/**
 * {
 *		defaultLang: "en"
 *		availableLangs: ["en", "fr"]
 * }
 */

export interface Scheme {
	config: {
		localization?: LocalizationConfig;
	};
	pages: Page[];
}

export interface FieldThis {
	[key: string]: any;
}
