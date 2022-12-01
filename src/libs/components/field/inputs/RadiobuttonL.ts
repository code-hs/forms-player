import {ActionerL, Action} from '@/libs/components/field/inputs/ActionerL';

interface OnInputEvent {
	[key: string]: any;
}
interface Option {
	value: string;
	text: string;
	action?: Action;
}

type Options = Option[];
// custom.options

export class RadiobuttonL {
	static findOption(options: Options, value: string): Option {
		return options.find((item: Option) => item.value === value) as Option;
	}

	static processActions(options: Options, e: OnInputEvent) {
		const option = this.findOption(options, e?.target?.value);
		const action = option?.action || null;

		if (!action) return;

		ActionerL.processAction(action);
	}
}
