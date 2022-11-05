import {Field} from '@/libs/scheme/schemeStructure';
import {FieldHelper as FH} from '@/libs/components/field/FieldHelper';

export class VirtualComponentHelper {
	static canInitModel(
		allowedComponents: string[],
		fieldType: string,
		field: Field
	): boolean {
		if (!allowedComponents.includes(fieldType)) return false;

		const multiBoxName = FH.getMultiName(field);
		// skip initialize, fix bug, when add new group of fields,
		// all groups rerender, and reinit, and clear values
		if (multiBoxName) return false;

		// noinspection RedundantIfStatementJS
		if (!field.common.model) return false;

		return true;
	}
}
