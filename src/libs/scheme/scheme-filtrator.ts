import {Scheme, Page, Field} from '@/libs/scheme/scheme-structure';

export class SchemeFiltrator {
	private readonly scheme: Scheme;

	constructor(scheme: Scheme) {
		this.scheme = scheme;
	}

	filtrate(): void {
		if (!this.scheme.pages || !this.scheme.pages.length) return;

		this.byParamEnable();
	}

	private byParamEnable(): void {
		this.scheme.pages = this.scheme.pages.filter((page: Page) => this.isEnable(page));
	}

	private isEnable(component: Page | Field): boolean {
		if (!component) return false;
		// @ts-ignore
		if (component?.common?.enable === false) return false;
		if (!component.components) return true;

		// if component has children
		// filtrate children by reference
		component.components = component.components.filter((child: Field) => this.isEnable(child));

		return true;
	}
}
