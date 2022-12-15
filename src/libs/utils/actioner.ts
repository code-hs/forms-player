import {bus, busBroadcasts} from '@/utils/bus';

export interface Action {
	type: string;
	container?: string;
	nextSibling?: number;
	previousSibling?: number;
	[key: string]: any;
}

export class Actioner {
	static types = {
		SHOW_CONTAINER: 'SHOW_CONTAINER',
		HIDE_CONTAINER: 'HIDE_CONTAINER',
		ADD_CLASS: 'ADD_CLASS',
		REMOVE_CLASS: 'REMOVE_CLASS',
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

	getPurposeElement(app: Element): Element | undefined {
		let purposeContainer: Element | null | undefined;

		if (this.action.container) {
			purposeContainer = app.querySelector(this.action.container);
		} else if (this.action.nextSibling === 1) {
			purposeContainer = this.vrcContainer.nextElementSibling;
		} else if (this.action.nextSibling === 2) {
			purposeContainer =
				this.vrcContainer.nextElementSibling?.nextElementSibling;
		} else if (this.action.nextSibling === 3) {
			purposeContainer =
				this.vrcContainer.nextElementSibling?.nextElementSibling
					?.nextElementSibling;
		} else if (this.action.previousSibling === 1) {
			purposeContainer = this.vrcContainer.previousElementSibling;
		} else if (this.action.previousSibling === 2) {
			purposeContainer =
				this.vrcContainer.previousElementSibling?.previousElementSibling;
		} else if (this.action.previousSibling === 3) {
			purposeContainer =
				this.vrcContainer.previousElementSibling?.previousElementSibling
					?.previousElementSibling;
		}

		if (!purposeContainer) return;

		// get .field element
		return purposeContainer.firstChild as Element;
	}
}
