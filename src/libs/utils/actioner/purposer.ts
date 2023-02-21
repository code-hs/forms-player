import {Action, ActionTypes} from './types';

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
		let elements;

		if (this.action.container) {
			elements = this.getFromContainer();
		} else if (this.action.nextSibling || this.action.previousSibling) {
			elements = this.getFromSibling();
		}

		if (elements) elements = this.prepareElements(elements);

		return elements;
	}

	private getFromContainer(): Element[] | undefined {
		const selector: string = this.action.container as string;
		const container = this.app.querySelectorAll(selector);

		if (!container) return;

		// to array, for have functions like .filter
		return Array.from(container);
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
			return this.vrcContainer.nextElementSibling?.nextElementSibling?.nextElementSibling;
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

	private prepareElements(elements: Element[]): Element[] {
		if (
			(this.action.type === ActionTypes.CHECK_ANOTHERS ||
				this.action.type === ActionTypes.UNCHECK_ANOTHERS) &&
			this.action.container
		) {
			// delete one checkbox, that was checked, clicked
			// and in the future, all another checkboxes will be unchecked
			const selector = this.action.container as string;
			const checkbox = this.vrcContainer.querySelector(selector);

			return elements.filter(el => el !== checkbox);
		}

		return elements;
	}
}
