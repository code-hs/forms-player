export function stringToRegex(str: string): RegExp {
	if (!str) {
		throw new Error('regexp: source string for create regexp is empty');
	}
	// Main regex
	// @ts-ignore
	const main: string = str.match(/\/(.+)\/.*/)[1];
	// Regex options
	// @ts-ignore
	const options: string = str.match(/\/.+\/(.*)/)[1];

	// Compiled regex
	const regexp = new RegExp(main, options);

	if (regexp.constructor.name !== 'RegExp') {
		throw new Error('regexp: source string is not correct type');
	}

	return regexp;
}
