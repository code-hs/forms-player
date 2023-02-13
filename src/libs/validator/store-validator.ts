import {bus, busBroadcasts} from '@/utils/bus';

export interface ValidatorField {
	readonly key: number;
	error: boolean;
	answered: boolean;
}

export class StoreValidator {
	// global bus commands
	// noinspection JSUnresolvedFunction
	static commands = {
		start: () => bus.$emit(busBroadcasts.VALIDATION_START),
		finishSuccess: () => bus.$emit(busBroadcasts.VALIDATION_FINISH_SUCCESS),
		formHasError: () => bus.$emit(busBroadcasts.VALIDATION_FORM_HAS_ERROR),
	};

	static findIndex(fields: ValidatorField[], key: number): number {
		if (!key) throw new Error('StoreValidator.findIndex: param key is empty');

		const index: number = fields.findIndex((field: ValidatorField) => field.key === key);
		if (index === -1) {
			throw new Error("StoreValidator.findIndex: can't find index");
		}

		return index;
	}
}
