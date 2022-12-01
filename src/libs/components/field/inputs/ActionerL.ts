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

	static processAction(action: Action) {
		if (
			action.type === this.types.SHOW_CONTAINER ||
			action.type === this.types.HIDE_CONTAINER
		) {
			bus.$emit(busBroadcasts.DISPLAY_CONTAINER, {action});
			// catch this event in src/components/utils/actioner/displayer.vue
		}
	}
}
