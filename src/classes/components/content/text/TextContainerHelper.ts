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
}
