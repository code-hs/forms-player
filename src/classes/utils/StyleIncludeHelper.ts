import {StylesParams, Page, Field} from '@/classes/scheme/schemeStructure';
import {SchemeController} from '@/classes/scheme/SchemeController';

export class StyleIncludeHelper {
	static stylesStore: StylesParams[] = [];

	static getAllStyles(): string {
		const globalStyles: StylesParams | undefined =
			SchemeController.getConfig()?.styles;

		if (globalStyles) this.stylesStore.push(globalStyles);

		const pages: Page[] = SchemeController.getScheme()?.pages;

		pages.forEach(page => {
			this.getStyles(page);
		});

		if (!this.stylesStore.length) return '';

		const stylesString = this.stylesStore.reduce((acc, style) => {
			// eslint-disable-next-line no-param-reassign
			acc += ` ${this.getStylesFromObject(style)}`;
			return acc;
		}, '');

		return stylesString;
	}

	private static getStyles(component: Page | Field): void {
		// is correct component
		if (!component) return;
		// @ts-ignore
		if (component?.common?.enable === false) return;

		// process styles in current component
		if (component.styles) this.stylesStore.push(component.styles);

		// process children
		if (!component.components) return;
		component.components.forEach((child: Field) => {
			this.getStyles(child);
		});
	}

	private static getStylesFromObject(stylesObj: StylesParams): string {
		if (!stylesObj.value && !stylesObj.values) return '';

		let output = stylesObj.value || '';

		if (stylesObj.values && Array.isArray(stylesObj.values)) {
			output += ` ${stylesObj.values.join(' ')}`;
		}

		return output;
	}
}
