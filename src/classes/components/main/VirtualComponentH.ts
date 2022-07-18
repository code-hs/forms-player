import {Field} from '@/classes/scheme/structure';
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper';

export class VirtualComponentH {
	static isAllowInitModel(
		allowedComponents: string[],
		fieldType: string,
		field: Field
	): boolean {
		if (!allowedComponents.includes(fieldType)) return false;

		const multiBoxName = FH.getMultiName(field);
		// skip initialize, fix bug, when add new group of fields,
		// all groups rerender, and reinit, and clear values
		if (multiBoxName) return false;

		if (!field.common.model) return false;

		return true;
	}
}
