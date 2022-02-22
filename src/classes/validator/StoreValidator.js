export class StoreValidator {
	static findIndex(fields, key) {
		if (!key) throw new Error('validator: destroyField: bad fieldKey. 1');

		const index = fields.findIndex(item => item.key === key);
		if (index === -1) {
			throw new Error('validator: destroyField: bad fieldKey. 2');
		}
		return index;
	}
}
