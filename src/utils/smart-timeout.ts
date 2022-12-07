export class SmartTimeout {
	static timeouts = {
		loadingFile: 50,
	};

	static coefficients = {
		loadingFile: 2,
	};

	private value: number;
	readonly coefficient: number;
	readonly maxValue: number;
	startValue: number;
	counts: number;
	totalTime: number;

	constructor(startValue: number, coefficient: number = 1, maxValue = 5000) {
		this.value = startValue;
		this.startValue = startValue;
		this.coefficient = coefficient;
		this.maxValue = maxValue;
		this.counts = 0;
		this.totalTime = 0;
	}

	static createForLoadFile() {
		return new SmartTimeout(
			this.timeouts.loadingFile,
			this.coefficients.loadingFile
		);
	}

	valueOf(): number {
		const output: number = ~~this.value;
		this.increment();

		return output;
	}

	private increment(): void {
		this.totalTime += this.value;

		if (this.value * this.coefficient >= this.maxValue) {
			this.value = this.maxValue;
		} else {
			this.value *= this.coefficient;
		}

		this.counts++;
	}

	getValue(): number {
		return ~~this.value;
	}

	restart(): void {
		this.value = this.startValue;
		this.counts = 0;
		this.totalTime = 0;
	}
}
