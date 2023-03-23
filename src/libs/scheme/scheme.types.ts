export interface ValidationParams {
	readonly required?: boolean;
	readonly pattern?: string;
	readonly requiredOnlyIfVisible?: boolean;
	readonly texts?: {
		readonly [key: string]: string;
	};
}
export interface CustomParams {
	multi?: {
		readonly name: string;
		key: number;
	};
	[key: string]: any;
}

export interface CommonClasses {
	readonly container?: string;
	readonly element?: string;
}

export interface CommonParams {
	readonly type: string;
	readonly model?: string;
	readonly enable?: boolean;
	readonly class?: CommonClasses;
}

export interface AttrsParams {
	readonly container?: Record<string, any>;
	readonly component?: Record<string, any>;
}
export interface TextParams {
	readonly placeholder?: string;
	readonly hint?: string;
}
export interface StylesParams {
	readonly value?: string | string[];
}
export interface HtmlParams {}

export interface Field {
	readonly common: CommonParams;
	readonly attrs?: AttrsParams;
	custom?: CustomParams;
	readonly validation?: ValidationParams;
	readonly text?: TextParams;
	readonly styles?: StylesParams;
	readonly html?: HtmlParams;
	components?: Field[];
}

export interface Page {
	readonly id?: number;
	readonly key?: string;
	readonly description?: string;
	readonly position?: number;
	readonly styles?: StylesParams;
	components?: Field[];
}

export interface LocalizationConfig {
	readonly defaultLang?: string;
	readonly availableLangs?: string[];
}
/**
 * {
 *		defaultLang: "en"
 *		availableLangs: ["en", "fr"]
 * }
 */

export interface ModuleConfig {
	readonly forEachField?: object;
	readonly [key: string]: any;
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
	readonly name: string;
	readonly enable: boolean;
	readonly config?: ModuleConfig;
}

export interface Variables {
	readonly [key: string]: any;
}

export interface Configurations {
	readonly modules?: Module[];
	readonly localization?: LocalizationConfig;
	readonly styles?: StylesParams;
	readonly variables?: Variables;
}

export interface Scheme {
	readonly config: Configurations;
	pages: Page[];
}
