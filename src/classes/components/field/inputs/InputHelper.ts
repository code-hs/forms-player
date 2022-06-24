import {FieldThis} from '@/classes/scheme/Structure';
import {FieldValidator} from '@/classes/validator/FieldValidator';

interface OnInputEvent {
	[key: string]: any;
}

export class InputHelper {
	static processTextPattern(fieldThis: FieldThis, e: OnInputEvent): void {
		if (!fieldThis?.customParams?.pattern || !e) return;

		const regexp = FieldValidator.stringToRegex(fieldThis.customParams.pattern);

		if (!regexp.test(e.target.value)) {
			fieldThis.modelStore[fieldThis.generalParams.model] = fieldThis.prevValue;
			return;
		}

		fieldThis.prevValue = fieldThis.modelStore[fieldThis.generalParams.model];
	}
}
