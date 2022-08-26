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
export const customExample: CustomParams = {};

export interface CommonParams {
	type: string;
	model?: string;
	enable?: boolean;
	class?: string;
}

export interface TextParams {
	placeholder?: string;
	hint?: string;
}
export const textExample: TextParams = {
	placeholder: '',
	hint: '',
};

export interface StylesParams {
	value?: string;
}
export const stylesExample: StylesParams = {};

export interface HtmlParams {}
export const htmlExample: HtmlParams = {};

export interface Field {
	common: CommonParams;
	custom?: CustomParams;
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

export interface ModuleOptions {
	global?: any;
	forEachField?: object;
	[key: string]: any;
}

export interface Module {
	name: string;
	enable: boolean;
	options?: ModuleOptions;
}

export interface Configurations {
	modules?: Module[];
	localization?: LocalizationConfig;
}

export interface Scheme {
	config: Configurations;
	styles?: StylesParams;
	pages: Page[];
}

export interface FieldThis {
	[key: string]: any;
}
