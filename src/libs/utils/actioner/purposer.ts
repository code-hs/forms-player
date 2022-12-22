import {Action} from './structure';

export class Purposer {
	private readonly action: Action;
	private readonly vrcContainer: Element;
	private readonly app: Element;

	constructor(action: Action, vrcContainer: Element, app: Element) {
		this.action = action;
		this.vrcContainer = vrcContainer;
		this.app = app;
	}

	getElements(): Element[] | undefined {
		if (this.action.container) {
			return this.getFromContainer();
		} else if (this.action.nextSibling || this.action.previousSibling) {
			return this.getFromSibling();
		}
	}

	private getFromContainer(): Element[] | undefined {
		// @ts-ignore
		const selector: string = this.action.container;
		const container = this.app.querySelectorAll(selector) as NodeList;

		if (!container) return;

		// transform NodeList to Array,
		// because NodeList hasn't method .map()

		// and take first child of each element
		// (get .field element, not .vrc-Container)
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

		// get element from .vrc container
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
