import {bus, busBroadcasts} from '@/utils/bus';
import {Action} from './structure';
import {Purposer} from '@/libs/utils/actioner/purposer';

export class Actioner {
	static types = {
		SHOW_CONTAINER: 'SHOW_CONTAINER',
		HIDE_CONTAINER: 'HIDE_CONTAINER',

		ADD_CLASS: 'ADD_CLASS_CONTAINER',
		REMOVE_CLASS: 'REMOVE_CLASS_CONTAINER',

		ENABLE: 'ENABLE_INPUT',
		DISABLE: 'DISABLE_INPUT',
	};

	private readonly action: Action;
	private readonly vrcContainer: Element;

	constructor(action: Action, creatorAction: Element) {
		this.action = action;
		// go to .vrc-Radiobuttons or another container
		this.vrcContainer = creatorAction.closest('.vrc') as Element;
	}

	process(): void {
		if (!this.action) {
			console.error('ActionerL.process: cant find action');
			return;
		}
		if (!this.vrcContainer) {
			console.error('ActionerL.process: cant find vrcContainer');
			return;
		}

		this.emitAction();
	}

	private emitAction(): void {
		if (
			this.action.type === Actioner.types.SHOW_CONTAINER ||
			this.action.type === Actioner.types.HIDE_CONTAINER
		) {
			bus.$emit(busBroadcasts.DISPLAY_CONTAINER, this);
			// catch this event in src/components/utils/actioner/displayer.vue
		}
	}

	getPurposeElements(app: Element): Element[] | undefined {
		return new Purposer(this.action, this.vrcContainer, app).getElements();
	}
}
