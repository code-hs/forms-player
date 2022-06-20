import {Scheme, Page, Field} from '@/classes/scheme/Structure';

export class SchemeFiltrator {
	static filtrateParamEnable(scheme: Scheme) {
		if (!scheme.pages || !scheme.pages.length) {
			return scheme;
		}

		scheme.pages = scheme.pages.filter((page: Page) => this._isEnable(page));

		return scheme;
	}

	static _isEnable(component: Page | Field): boolean {
		if (!component) return false;
		// @ts-ignore
		if (component?.generalParams?.enable === false) return false;
		if (!component.components) return true;

		// if component has children
		// filtrate children by reference
		component.components = component.components.filter((child: Field) =>
			this._isEnable(child)
		);

		return true;
	}
}
