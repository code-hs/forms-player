import {Field} from '@/libs/scheme/schemeStructure';

export class LayoutColumns {
	static getColumnClasses(field: Field): string {
		if (!field) return '';

		let classes = '';
		// col-6, col-12,...
		// this param created in columns/index.vue
		const childrenCount = field.custom?.childCount || 1;
		let col: number = Math.floor(12 / childrenCount);

		if (field.custom?.col) {
			col = field.custom.col;
		}

		classes += `col-${col} `;

		if (field.common?.class) classes += `${field.common.class} `;

		return classes;
	}
}
