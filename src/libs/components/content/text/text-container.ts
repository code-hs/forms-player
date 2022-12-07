import {FieldThis} from '@/libs/components/field/field-structure';

export class TextContainerL {
	static allowedTags: string[] = [
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'span',
		'p',
	];

	private static canTag(tag: string): boolean {
		return this.allowedTags.includes(tag);
	}

	static isShow(fieldThis: FieldThis): boolean {
		const canTag: boolean = this.canTag(fieldThis.custom.tag);

		if (!canTag) {
			throw new Error(`Tag ${fieldThis.custom.tag} is not allowed.`);
		}

		return canTag && fieldThis.text.value;
	}
}
