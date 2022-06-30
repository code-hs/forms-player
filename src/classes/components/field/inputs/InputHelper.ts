import {FieldThis} from '@/classes/scheme/structure';
import {FieldValidator} from '@/classes/validator/FieldValidator';

interface OnInputEvent {
	[key: string]: any;
}

export class InputHelper {
	static processTextPatternDirty(fieldThis: FieldThis, e: OnInputEvent): void {
		if (!fieldThis?.customParams?.pattern || !e) return;
		if (fieldThis.mask) return; // if mask is set, pattern is not used

		const regexp = FieldValidator.stringToRegex(fieldThis.customParams.pattern);

		if (!regexp.test(e.target.value)) {
			fieldThis.modelStore[fieldThis.common.model] = fieldThis.prevValue;
			return;
		}

		fieldThis.prevValue = fieldThis.modelStore[fieldThis.common.model];
	}

	static initMaskDirty(fieldThis: FieldThis): void {
		fieldThis.mask = fieldThis.customParams.mask || '';

		if (fieldThis.customParams.pattern && fieldThis.mask) {
			throw new Error(
				'InputHelper.initMask: mask and pattern are both set,' +
					' use only one of them'
			);
		}
	}
}
