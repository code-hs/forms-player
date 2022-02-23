export class StoreValidator {
	/**
	 * @param {object[]} fields
	 * @param {number} key
	 * @returns {number} index
	 */
	static findIndex(fields, key) {
		if (!key) throw new Error('StoreValidator: findIndex: bad fieldKey. 1');

		const index = fields.findIndex(item => item.key === key);
		if (index === -1) {
			throw new Error('StoreValidator: findIndex: cant find index');
		}
		return index;
	}
}
