import {Actioner} from '@/libs/utils/actioner';
import {Action} from '@/libs/utils/actioner/structure';

export interface OnInputEvent {
	[key: string]: any;
}

export interface Option {
	value: string;
	text: string;
	action?: Action;
}

export type Options = Option[];

export class RadiobuttonsL {
	static sendAction(
		options: Options,
		e: OnInputEvent,
		firstElement: Element
	): void {
		const action: Action | undefined = RadiobuttonsL.getAction(options, e);
		if (!action) {
			return console.error('Radiobuttons: empty action');
		}

		new Actioner(action, firstElement).run();
	}

	static getAction(options: Options, e: OnInputEvent): Action | undefined {
		const selectedValue: string = e.target?.value;
		const option: Option | undefined = options.find(
			o => o.value === selectedValue
		) as Option;

		return option?.action;
	}
}
