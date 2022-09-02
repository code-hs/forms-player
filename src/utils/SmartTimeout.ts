// создавать класс на основании статической функции, со всеми готовыми параметрами

export class SmartTimeout {
	static coefficients = {
		loadingFile: 2,
	};

	static timeouts = {
		loadingFile: 50,
	};

	private value: number;
	readonly coefficient: number;
	readonly maxValue: number;
	counts: number;
	totalTime: number;

	constructor(startValue: number, coefficient: number = 1, maxValue = 5000) {
		this.value = startValue;
		this.coefficient = coefficient;
		this.maxValue = maxValue;
		this.counts = 0;
		this.totalTime = 0;
	}

	valueOf(): number {
		const output = ~~this.value;
		this.increment();

		return output;
	}

	private increment() {
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
}
