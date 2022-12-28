import {StylesParams, Page, Field} from '@/libs/scheme/scheme-structure';
import {SchemeController} from '@/libs/scheme/scheme-controller';

export class StyleIncluder {
	private readonly stack: StylesParams[] = [];

	constructor() {
		this.initStack();
	}

	private initStack(): void {
		const global: StylesParams | undefined =
			SchemeController.getConfig()?.styles;
		if (global) this.stack.push(global);

		const pages: Page[] = SchemeController.getScheme()?.pages;
		pages.forEach(page => {
			this.initStackInChildren(page);
		});
	}

	private initStackInChildren(component: Page | Field): void {
		// is correct component
		if (!component) return;
		// @ts-ignore
		if (component?.common?.enable === false) return;

		// process styles in current component
		if (component.styles) this.stack.push(component.styles);

		// process children
		if (!component.components) return;
		component.components.forEach((child: Field) => {
			this.initStackInChildren(child);
		});
	}

	toString(): string {
		if (!this.stack.length) return '';

		return this.stack.reduce((acc, item) => {
			// eslint-disable-next-line no-param-reassign
			acc += `${this.parseStylesFromStack(item)} `;
			return acc;
		}, '');
	}

	private parseStylesFromStack(stylesObj: StylesParams): string {
		const endLine = '\r\n';
		if (!stylesObj.value) return '';

		if (typeof stylesObj.value === 'string') {
			return `${stylesObj.value}  ${endLine}`;
		} else if (Array.isArray(stylesObj.value)) {
			const str = stylesObj.value.join(` ${endLine}`);
			return `${str} `;
		}

		return '';
	}
}
