export class SmartTimeout {
	static coefficients = {
		loadingFile: 2.5,
	};

	private startValue: number;
	readonly coefficient: number;
	readonly maxValue: number;

	constructor(startValue: number, coefficient: number = 1, maxValue = 10000) {
		this.startValue = startValue;
		this.coefficient = coefficient;
		this.maxValue = maxValue;
	}

	updateValue(): void {
		if (this.startValue * this.coefficient >= this.maxValue) {
			this.startValue = this.maxValue;
		} else {
			this.startValue *= this.coefficient;
		}
	}

	valueOf(): number {
		const output = this.startValue;
		this.updateValue();

		return ~~output;
	}

	getValue(): number {
		return this.startValue;
	}
}
