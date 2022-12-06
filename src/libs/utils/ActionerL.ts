import {FieldThis} from '@/libs/components/field/fieldStructure';
import {bus, busBroadcasts} from '@/utils/bus';

export interface Action {
	type: string;
	container?: string;
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
}
