import {FieldThis} from '@/classes/scheme/structure';

export class TextContainerHelper {
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

	static isAllowedTag(tag: string): boolean {
		return this.allowedTags.includes(tag);
	}

	static isShow(fieldThis: FieldThis): boolean {
		const isAllowedTag: boolean = this.isAllowedTag(fieldThis.custom.tag);

		if (!isAllowedTag) {
			throw new Error(`Tag ${fieldThis.custom.tag} is not allowed.`);
		}

		return isAllowedTag && fieldThis.text.value;
	}
}
