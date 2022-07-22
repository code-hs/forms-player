import {Field} from '@/classes/scheme/structure';

export class LayoutColumns {
	static getColumnClasses(field: Field): string {
		if (!field) return '';

		let classes: string = '';

		// custom.childLength;
		// col-6, col-12,...
		// @ts-ignore
		// this param created it columns.vue
		let col: number = Math.floor(12 / field.custom.childCount);

		if (field.custom?.col) {
			col = field.custom.col;
		}

		classes += `col-${col} `;

		if (field.common?.class) classes += `${field.common.class} `;

		return classes;
	}
}
