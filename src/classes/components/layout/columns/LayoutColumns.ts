import {Field} from '@/classes/scheme/Structure';

export class LayoutColumns {
	static getColumnClasses(field: Field): string {
		let classes: string = '';

		// customParams.childLength;
		// col-6, col-12,...
		// @ts-ignore
		// this param created it columns.vue
		let col: number = Math.floor(12 / field.customParams.childCount);

		if (field.customParams?.col) {
			col = field.customParams.col;
		}

		classes += `col-${col} `;

		return classes;
	}
}
