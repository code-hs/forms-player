import {bus, busBroadcasts} from '@/utils/bus';
import {Action} from './types';
import {Purposer} from '@/libs/utils/actioner/purposer';

export class Actioner {
	static types = {
		SHOW_CONTAINER: 'SHOW_CONTAINER',
		HIDE_CONTAINER: 'HIDE_CONTAINER',

		ADD_CLASS_CONTAINER: 'ADD_CLASS_CONTAINER',
		REMOVE_CLASS_CONTAINER: 'REMOVE_CLASS_CONTAINER',

		ENABLE: 'ENABLE_INPUT',
		DISABLE: 'DISABLE_INPUT',
	};

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
		const keys = {
			[Actioner.types.SHOW_CONTAINER]: busBroadcasts.DISPLAY_CONTAINER,
			[Actioner.types.HIDE_CONTAINER]: busBroadcasts.DISPLAY_CONTAINER,
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
