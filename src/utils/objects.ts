export function isObject(item: any): boolean {
	return typeof item === 'object' && !Array.isArray(item) && item !== null;
}

/**
 * Get value by string key in deep object
 * @param {string} key - like 'foo.boo.bar'
 */
export function getValueByStringKey(key: string, localesStore: object) {
	// ['foo', 'boo', 'bar']
	const keysParts: string[] = key.split('.');

	return keysParts.reduce(
		(accObject: any, key: string) => (accObject[key] ? accObject[key] : ''),
		localesStore
	);
}
