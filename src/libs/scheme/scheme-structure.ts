export interface ValidationParams {
	required?: boolean;
	pattern?: string;
	requiredOnlyIfVisible?: boolean;
	texts?: {
		[key: string]: string;
	};
}
export interface CustomParams {
	multi?: {
		name: string;
		key: number;
	};
	[key: string]: any;
}
export interface CommonParams {
	type: string;
	model?: string;
	enable?: boolean;
	class?: string;
}

export interface AttrsParams {
	container: {[key: string]: any};
	component: {[key: string]: any};
}
export interface TextParams {
	placeholder?: string;
	hint?: string;
}
export interface StylesParams {
	value?: string;
	values?: string[];
}
export interface HtmlParams {}

export interface Field {
	common: CommonParams;
	attrs?: AttrsParams;
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
	styles?: StylesParams;
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

export interface ModuleConfig {
	forEachField?: object;
	[key: string]: any;
}
// "config": {
// 	"locales": {
// 		"relations": {
// 			"ua": "uk",
// 			"en": "en-AU",
// 			"fr": "fr"
// 		}
// 	},
// 	"forEachField": {
// 		"format": "mm/dd/yyyy",
// 		"autohide": true
// 	}
// }

export interface Module {
	name: string;
	enable: boolean;
	config?: ModuleConfig;
}

export interface Variables {
	[key: string]: any;
}

export interface Configurations {
	modules?: Module[];
	localization?: LocalizationConfig;
	styles?: StylesParams;
	variables?: Variables;
}

export interface Scheme {
	config: Configurations;
	pages: Page[];
}
