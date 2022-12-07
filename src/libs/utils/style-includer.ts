import {StylesParams, Page, Field} from '@/libs/scheme/scheme-structure';
import {SchemeController} from '@/libs/scheme/scheme-controller';

export class StyleIncluderL {
	static stack: StylesParams[] = [];

	static getAllStylesAsStr(): string {
		const styles: StylesParams[] = this.getAllStyles();
		return this.stylesToStr(styles);
	}

	private static getAllStyles(): StylesParams[] {
		this.stack = [];

		const global: StylesParams | undefined =
			SchemeController.getConfig()?.styles;
		if (global) this.stack.push(global);

		const pages: Page[] = SchemeController.getScheme()?.pages;
		pages.forEach(page => {
			this.getStyles(page);
		});

		return this.stack;
	}

	private static getStyles(component: Page | Field): void {
		// is correct component
		if (!component) return;
		// @ts-ignore
		if (component?.common?.enable === false) return;

		// process styles in current component
		if (component.styles) this.stack.push(component.styles);

		// process children
		if (!component.components) return;
		component.components.forEach((child: Field) => {
			this.getStyles(child);
		});
	}

	private static parseStyles(stylesObj: StylesParams): string {
		if (!stylesObj.value && !stylesObj.values) return '';

		let output = stylesObj.value || '';

		if (stylesObj.values && Array.isArray(stylesObj.values)) {
			output += `${stylesObj.values.join(' ')} `;
		}

		return output;
	}

	private static stylesToStr(styles: StylesParams[]): string {
		if (!styles.length) return '';

		// noinspection UnnecessaryLocalVariableJS
		return styles.reduce((acc, item) => {
			// eslint-disable-next-line no-param-reassign
			acc += `${this.parseStyles(item)} `;
			return acc;
		}, '');
	}
}
