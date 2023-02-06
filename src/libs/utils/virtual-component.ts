import {Field} from '@/libs/scheme/scheme-structure';
import {FieldL as FL} from '@/libs/components/field/field';
import {Consts} from '@/config/consts';

export class VirtualComponent {
	static canInitModel(fieldType: string, field: Field): boolean {
		if (!Consts.allowedComponentsForModelData.includes(fieldType)) return false;

		const multiboxName = FL.getMultiName(field);
		// skip initialize, fix bug, when add new group of fields,
		// all groups rerender, and reinit, and clear values
		if (multiboxName) return false;

		// noinspection RedundantIfStatementJS
		if (!field.common.model) return false;

		return true;
	}
}
