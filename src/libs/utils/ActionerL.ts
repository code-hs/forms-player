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
		if (action.container) {
			return app.querySelector(action.container);
		}

		if (action.nextSibling === 1) {
			return startActionElem.nextSibling;
		}
		if (action.nextSibling === 2) {
			return startActionElem.nextSibling.nextSibling;
		}
		if (action.nextSibling === 3) {
			return startActionElem.nextSibling.nextSibling.nextSibling;
		}

		if (action.previousSibling === 1) {
			return startActionElem.previousSibling;
		}
		if (action.previousSibling === 2) {
			return startActionElem.previousSibling.previousSibling;
		}
		if (action.previousSibling === 3) {
			return startActionElem.previousSibling.previousSibling.previousSibling;
		}
	}
}
