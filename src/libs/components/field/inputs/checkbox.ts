import {Actioner} from '@/libs/utils/actioner';
import {Action} from '@/libs/utils/actioner/types';

export interface OnInputEvent {
	readonly [key: string]: any;
}

export class CheckboxL {
	static sendAction(action: Action, e: OnInputEvent, checkbox: Element): void {
		if (!action) return;

		new Actioner(action, checkbox).run();
	}
}
