import {Field} from '@/classes/scheme/structure';

export class StylesH {
	static getStyles(field: Field): string {
		return field?.styles?.value || '';
	}
}
