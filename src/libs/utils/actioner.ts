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
		if (this.action.container) {
			return this.getFromContainer(app);
		} else if (this.action.nextSibling || this.action.previousSibling) {
			return this.getFromSibling();
		}
	}

	private getFromContainer(app: Element): Element[] | undefined {
		// @ts-ignore
		const selector: string = this.action.container;
		const container = app.querySelectorAll(selector) as NodeList;

		if (!container) return;

		// get .field element, not .vrc-Container
		// const res: Element[] = [];
		// container.forEach((el: Node) => {
		// 	res.push(el.firstChild as Element);
		// });
		//
		// return res;

		return Array.from(container).map(el => el.firstChild as Element);
	}

	private getFromSibling(): Element[] | undefined {
		let container: Element | undefined | null;

		if (this.action.nextSibling) {
			container = this.processNextSibling();
		} else if (this.action.previousSibling) {
			container = this.processPreviousSibling();
		}

		if (!container) return;

		const element = container.firstChild as Element;
		return [element];
	}

	private processNextSibling(): Element | null | undefined {
		if (this.action.nextSibling === 1) {
			return this.vrcContainer.nextElementSibling;
		}
		if (this.action.nextSibling === 2) {
			return this.vrcContainer.nextElementSibling?.nextElementSibling;
		}
		if (this.action.nextSibling === 3) {
			return this.vrcContainer.nextElementSibling?.nextElementSibling
				?.nextElementSibling;
		}
	}

	private processPreviousSibling(): Element | null | undefined {
		if (this.action.previousSibling === 1) {
			return this.vrcContainer.previousElementSibling;
		}
		if (this.action.previousSibling === 2) {
			return this.vrcContainer.previousElementSibling?.previousElementSibling;
		}
		if (this.action.previousSibling === 3) {
			return this.vrcContainer.previousElementSibling?.previousElementSibling
				?.previousElementSibling;
		}
	}
}
