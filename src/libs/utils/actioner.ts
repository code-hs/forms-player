import {FieldThis} from '@/libs/components/field/field-structure';
import {bus, busBroadcasts} from '@/utils/bus';

interface OnInputEvent {
	[key: string]: any;
}

export interface Action {
	type: string;
	container?: string;
	nextSibling?: number;
	previousSibling?: number;
	[key: string]: any;
}

interface Option {
	value: string;
	text: string;
	action?: Action;
}

type Options = Option[];
// custom.options

export class ActionerL {
	static types = {
		SHOW_CONTAINER: 'SHOW_CONTAINER',
		HIDE_CONTAINER: 'HIDE_CONTAINER',
	};

	static process(
		options: Options,
		e: OnInputEvent,
		startActionElem: Element
	): void {
		const option = this.findOption(options, e.target?.value);
		const action = option?.action || null;
		if (!action) return;

		// go to .vrc-Radiobuttons
		const inputContainer = startActionElem.closest('.vrc') as Element;
		this.processAction(inputContainer, action);
	}

	static processAction(startActionElem: FieldThis, action: Action) {
		const params = {action, startActionElem};

		if (
			action.type === this.types.SHOW_CONTAINER ||
			action.type === this.types.HIDE_CONTAINER
		) {
			bus.$emit(busBroadcasts.DISPLAY_CONTAINER, params);
			// catch this event in src/components/utils/actioner/displayer.vue
		}
	}

	// static getActionFromOptions

	static findOption(options: Options, value: string): Option {
		return options.find((item: Option) => item.value === value) as Option;
	}

	static getPurposeElement(
		startActionElem: FieldThis,
		action: Action,
		app: Element
	): Element | undefined | null {
		let vrcContainer;

		if (action.container) {
			vrcContainer = app.querySelector(action.container);
		} else if (action.nextSibling === 1) {
			vrcContainer = startActionElem.nextElementSibling;
		} else if (action.nextSibling === 2) {
			vrcContainer = startActionElem.nextElementSibling.nextElementSibling;
		} else if (action.nextSibling === 3) {
			vrcContainer =
				startActionElem.nextElementSibling.nextElementSibling
					.nextElementSibling;
		} else if (action.previousSibling === 1) {
			vrcContainer = startActionElem.previousElementSibling;
		} else if (action.previousSibling === 2) {
			vrcContainer =
				startActionElem.previousElementSibling.previousElementSibling;
		} else if (action.previousSibling === 3) {
			vrcContainer =
				startActionElem.previousElementSibling.previousElementSibling
					.previousElementSibling;
		}

		return this.getElementFromContainer(vrcContainer);
	}

	private static getElementFromContainer(container: Element): Element {
		return container.firstChild as Element;
	}
}
