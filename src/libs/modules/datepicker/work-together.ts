import {parseDate} from '@/utils/dateparser';
import {FieldThis, MultiboxInfo} from '@/libs/components/field/field.types';
// @ts-ignore
import store from '@/store';
import {Timestamp} from './types';

interface WorkTogetherOptions {
	selfIdentify: string;
	purposeModel: string;
	validateText: string;
}

export class WorkTogether {
	options: WorkTogetherOptions;
	inputValue: Timestamp;
	format: string;
	multiboxInfo: MultiboxInfo;

	constructor(fieldThis: FieldThis, inputTimestamp: number, format: string) {
		this.options = fieldThis.custom?.workTogether;
		this.inputValue = inputTimestamp;
		this.format = format;
		this.multiboxInfo = {
			index: fieldThis.multiboxIndex,
			name: fieldThis.multiboxName,
		};
	}

	async process(): Promise<string> {
		if (!this.hasNecessaryOptions()) return '';

		// todo: fix: no await, when will use pinia, create getter, not action, as it is now
		const purposeValue = await this.getPurposeValue();
		// if field is empty, nothing to check, correct go out
		if (!purposeValue) return '';

		return this.compareTimes(purposeValue);
	}

	private hasNecessaryOptions(): boolean {
		// don't have workTogether option, correct go out
		if (!this.options) return false;

		if (!this.options.selfIdentify || !this.options.purposeModel || !this.options.validateText) {
			console.error('WorkTogether.isCorrectParams: Not correct options');
			return false;
		}

		return true;
	}

	private getPurposeValue(): Promise<string> {
		const options = {
			fieldName: this.options.purposeModel,
			multiboxName: this.multiboxInfo.name,
			multiboxIndex: this.multiboxInfo.index,
		};

		return store.dispatch('model/getValueFromStructure', options);
	}

	private compareTimes(purposeValue: string): string {
		const {selfIdentify} = this.options;

		if (selfIdentify === 'START') {
			return this.compareByStart(purposeValue);
		} else if (this.options.selfIdentify === 'END') {
			return this.compareByEnd(purposeValue);
		} else {
			console.error('WorkTogether.compareTimes: not correct selfIdentify in workTogether option');
		}

		// correct, not find any errors in times
		return '';
	}

	private compareByStart(purposeValue: string): string {
		// parse finish date
		const finish: Timestamp = parseDate(purposeValue, this.format);
		// check if start date is bigger than finish date
		if (this.inputValue >= finish) {
			return this.options.validateText;
		}

		return '';
	}

	private compareByEnd(purposeValue: string): string {
		// parse start date
		const start: Timestamp = parseDate(purposeValue, this.format);
		// check if start date is bigger than finish date
		if (start >= this.inputValue) {
			return this.options.validateText;
		}

		return '';
	}
}
