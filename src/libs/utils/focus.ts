export class Focus {
	static getSelector(): string {
		const tags = ['input', 'select', 'textarea'];
		const modificators = ':not([disabled]):not([readonly]):not(hidden)';

		// only if field has status data-v-error='true'
		// that means field has error, field start process validation

		return tags.map(tag => `.field[data-v-error='true'] ${tag}${modificators}`).join(', ');
	}
}
