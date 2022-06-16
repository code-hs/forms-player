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

export interface ComponentParams {
	customParams?: CustomParams;
}
