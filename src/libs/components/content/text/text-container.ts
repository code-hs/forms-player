import {FieldThis} from '@/libs/components/field/field.types';
import {Consts} from '@/config/consts';

export class TextContainerL {
	private static canTag(tag: string): boolean {
		return Consts.textContainerAllowedTags.includes(tag);
	}

	static isShow(fieldThis: FieldThis): boolean {
		const canTag: boolean = this.canTag(fieldThis.custom.tag);

		if (!canTag) {
			throw new Error(`Tag ${fieldThis.custom.tag} is not allowed.`);
		}

		return canTag && fieldThis.text.value;
	}
}
