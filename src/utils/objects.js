export function isObject(item) {
	return typeof item === 'object' && !Array.isArray(item) && item !== null;
}

/**
 * Get value by string key in deep object
 * @param {string} key - like 'foo.boo.bar'
 * @param {Object} localesStore
 * @returns {string} text from dictionary
 */
export function getValueByStringKey(key, localesStore) {
	// ['foo', 'boo', 'bar']
	const keysParts = key.split('.');

	return keysParts.reduce(
		(accObject, field) => (accObject[field] ? accObject[field] : ''),
		localesStore
	);
}
