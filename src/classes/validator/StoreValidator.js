import {bus, busBroadcasts} from '@/utils/bus';

export class StoreValidator {
	// global bus commands
	// noinspection JSUnresolvedFunction
	static commands = {
		start: () => bus.$emit(busBroadcasts.VALIDATION_START),
		finishSuccess: () => bus.$emit(busBroadcasts.VALIDATION_FINISH_SUCCESS),
		formHasError: () => bus.$emit(busBroadcasts.VALIDATION_FORM_HAS_ERROR),
	};

	/**
	 * @param {object[]} fields
	 * @param {number} key
	 * @returns {number} index
	 */
	static findIndex(fields, key) {
		if (!key) throw new Error('StoreValidator.findIndex: param key is empty');

		const index = fields.findIndex(item => item.key === key);
		if (index === -1) {
			throw new Error("StoreValidator.findIndex: can't find index");
		}

		return index;
	}
}
