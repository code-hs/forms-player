interface Action {
	[key: string]: any;
	type: string;
	container?: string;
}

interface Option {
	value: string;
	text: string;
	action?: Action;
}

type Options = Option[];

export class RadiobuttonL {
	static findOption(options: Options, value: string): Option {
		return options.find((item: Option) => item.value === value) as Option;
	}
}
