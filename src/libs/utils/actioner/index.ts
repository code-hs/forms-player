import {bus, busBroadcasts} from '@/utils/bus';
import {Action, ActionTypes} from './types';
import {Purposer} from '@/libs/utils/actioner/purposer';

interface BusRelations {
	[key: string]: string;
}

export class Actioner {
	private readonly action: Action;
	private readonly vrcContainer: Element;

	constructor(action: Action, creatorAction: Element) {
		this.action = action;
		// go to .vrc-Radiobuttons or another container, upper creator action
		this.vrcContainer = creatorAction.closest('.vrc') as Element;
	}

	run(): void {
		try {
			this.checkParams();
			this.emitAction();
		} catch (e) {
			console.error(e);
		}
	}

	private checkParams(): void {
		if (!this.action) {
			throw new Error('ActionerL.process: empty action');
		}
		if (!this.vrcContainer) {
			throw new Error('ActionerL.process: bad action purpose');
		}
		if (!this.action.type) {
			throw new Error('ActionerL.process: empty action type');
		}
	}

	private getEmmitKey(): string | undefined {
		// relations, many actions fire one event,
		// one vue file, catch one event
		const keys: BusRelations = {
			[ActionTypes.SHOW_CONTAINER]: busBroadcasts.DISPLAY_CONTAINER,
			[ActionTypes.HIDE_CONTAINER]: busBroadcasts.DISPLAY_CONTAINER,

			[ActionTypes.ADD_CLASS_CONTAINER]: busBroadcasts.SET_CONTAINER_CLASS,
			[ActionTypes.REMOVE_CLASS_CONTAINER]: busBroadcasts.SET_CONTAINER_CLASS,

			[ActionTypes.ENABLE_INPUT]: busBroadcasts.ENABLING_INPUT,
			[ActionTypes.DISABLE_INPUT]: busBroadcasts.ENABLING_INPUT,

			[ActionTypes.UNCHECK_ANOTHERS]: busBroadcasts.CHECKING_INPUT,
			[ActionTypes.CHECK_ANOTHERS]: busBroadcasts.CHECKING_INPUT,
		};

		return keys[this.action.type];
	}

	private emitAction(): void {
		const key = this.getEmmitKey();
		if (!key) {
			return console.error('ActionerL.emitAction: unknown emmit key');
		}

		bus.$emit(key, this);
		// catch this event in src/components/utils/actioner/displayer.vue
	}

	getPurposeElements(app: Element): Element[] | undefined {
		return new Purposer(this.action, this.vrcContainer, app).getElements();
	}
}
