import {FieldThis} from '@/libs/components/field/field-structure';
import {stringToRegex} from '@/utils/regexp';

interface OnInputEvent {
	readonly [key: string]: any;
}

export class InputL {
	static initMaskDirty(fieldThis: FieldThis): void {
		fieldThis.mask = fieldThis.custom.mask || '';

		if (fieldThis.custom.pattern && fieldThis.mask) {
			throw new Error('InputL.initMask: mask and pattern are both set,' + ' use only one of them');
		}
	}

	static processTextPatternDirty(fieldThis: FieldThis, e: OnInputEvent): void {
		if (!fieldThis?.custom?.pattern || !e) return;
		if (fieldThis.mask) return; // if mask is set, pattern is not used

		const regexp = stringToRegex(fieldThis.custom.pattern);
		const {model} = fieldThis.common;

		if (!regexp.test(e.target.value)) {
			// if new value not match pattern, then set it to prev value
			fieldThis.modelStore[model] = fieldThis.prevValue;
			return;
		}

		// if new value - correct, then set it to prev value
		fieldThis.prevValue = fieldThis.modelStore[model];
	}
}
