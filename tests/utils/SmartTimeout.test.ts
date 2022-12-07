// noinspection DuplicatedCode,BadExpressionStatementJS

import {describe, it, expect} from '@jest/globals';
import {SmartTimeout} from '@/utils/smart-timeout';

describe('SmartTimeout', () => {
	it('main functional', () => {
		const smtt = new SmartTimeout(50, 2, 5000);
		const values = [];
		values.push(+smtt); // 50
		values.push(+smtt); // 100
		values.push(+smtt); // 200
		values.push(+smtt); // 400
		values.push(+smtt); // 800

		expect(values).toEqual([50, 100, 200, 400, 800]);
	});

	it('restart functional', () => {
		const smtt = new SmartTimeout(50, 2, 5000);
		const values = [];
		values.push(+smtt); // 50
		values.push(+smtt); // 100
		values.push(+smtt); // 200
		values.push(+smtt); // 400
		values.push(+smtt); // 800
		smtt.restart();
		values.push(+smtt); // 50
		values.push(+smtt); // 100

		expect(values).toEqual([50, 100, 200, 400, 800, 50, 100]);
	});

	it('createForLoadFile', () => {
		const smtt = SmartTimeout.createForLoadFile();
		const values = [];
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);

		expect(values).toEqual([50, 100, 200, 400, 800]);
	});

	it('main functional, another start data', () => {
		const smtt = new SmartTimeout(100, 1.5, 5000);
		const values = [];
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);

		expect(values).toEqual([100, 150, 225, 337, 506]);
	});

	it('main functional, maxValue', () => {
		const smtt = new SmartTimeout(50, 2, 5000);
		const values = [];
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);
		values.push(+smtt);

		expect(values).toEqual([
			50, 100, 200, 400, 800, 1600, 3200, 5000, 5000, 5000, 5000,
		]);
	});

	it('another data', () => {
		const smtt = new SmartTimeout(50, 2, 5000);
		const values = [];

		// eslint-disable-next-line no-unused-expressions
		+smtt;
		values.push(smtt.totalTime);
		// eslint-disable-next-line no-unused-expressions
		+smtt;
		values.push(smtt.totalTime);
		// eslint-disable-next-line no-unused-expressions
		+smtt;
		values.push(smtt.totalTime);
		// eslint-disable-next-line no-unused-expressions
		+smtt;
		values.push(smtt.totalTime);
		// eslint-disable-next-line no-unused-expressions
		+smtt;
		values.push(smtt.totalTime);
		// eslint-disable-next-line no-unused-expressions
		+smtt;
		values.push(smtt.totalTime);

		expect(values).toEqual([50, 150, 350, 750, 1550, 3150]);
		expect(smtt.counts).toBe(6);
	});
});
