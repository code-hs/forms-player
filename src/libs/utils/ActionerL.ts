import {FieldThis} from '@/libs/components/field/fieldStructure';
import {bus, busBroadcasts} from '@/utils/bus';

export interface Action {
	type: string;
	container?: string;
	nextSibling?: number;
	previousSibling?: number;
	[key: string]: any;
}

export class ActionerL {
	static types = {
		SHOW_CONTAINER: 'SHOW_CONTAINER',
		HIDE_CONTAINER: 'HIDE_CONTAINER',
	};

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

	static getPurposeElement(
		startActionElem: FieldThis,
		action: Action,
		app: Element
	): Element | undefined | null {
		let vrcContainer;

		if (action.container) {
			vrcContainer = app.querySelector(action.container);
		} else if (action.nextSibling === 1) {
			vrcContainer = startActionElem.nextSibling;
		} else if (action.nextSibling === 2) {
			vrcContainer = startActionElem.nextSibling.nextSibling;
		} else if (action.nextSibling === 3) {
			vrcContainer = startActionElem.nextSibling.nextSibling.nextSibling;
		} else if (action.previousSibling === 1) {
			vrcContainer = startActionElem.previousSibling;
		} else if (action.previousSibling === 2) {
			vrcContainer = startActionElem.previousSibling.previousSibling;
		} else if (action.previousSibling === 3) {
			vrcContainer =
				startActionElem.previousSibling.previousSibling.previousSibling;
		}

		return this.getElementFromContainer(vrcContainer);
	}

	private static getElementFromContainer(container: Element): Element {
		return container.firstChild as Element;
	}
}
