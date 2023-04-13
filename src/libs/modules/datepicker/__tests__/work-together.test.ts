import {describe, it, expect} from '@jest/globals';
import {parseDate} from '@/utils/dateparser';
import {WorkTogether} from '../work-together';

console.error = () => {};

describe('WorkTogether.hasNecessaryOptions', () => {
	it('returns false if options is falsy', () => {
		const workTogether = new WorkTogether({}, 0, '');
		// @ts-ignore
		expect(workTogether.hasNecessaryOptions()).toBeFalsy();
	});

	it('returns false if selfIdentify is missing', () => {
		const fieldThis = {
			custom: {
				workTogether: {
					purposeModel: 'model',
					validateText: 'my text',
				},
			},
		};
		const workTogether = new WorkTogether(fieldThis, 0, '');
		// @ts-ignore
		expect(workTogether.hasNecessaryOptions()).toBeFalsy();
	});

	it('returns false if purposeModel is missing', () => {
		const fieldThis = {
			custom: {
				workTogether: {
					selfIdentify: 'START',
					validateText: 'my text',
				},
			},
		};
		const workTogether = new WorkTogether(fieldThis, 0, '');
		// @ts-ignore
		expect(workTogether.hasNecessaryOptions()).toBeFalsy();
	});

	it('returns false if validateText is missing', () => {
		const fieldThis = {
			custom: {
				workTogether: {
					selfIdentify: 'START',
					purposeModel: 'model',
				},
			},
		};
		const workTogether = new WorkTogether(fieldThis, 0, '');
		// @ts-ignore
		expect(workTogether.hasNecessaryOptions()).toBeFalsy();
	});

	it('returns false if selfIdentify is not START or END', () => {
		const fieldThis = {
			custom: {
				workTogether: {
					selfIdentify: 'invalid',
					purposeModel: 'model',
					validateText: 'my text',
				},
			},
		};
		const workTogether = new WorkTogether(fieldThis, 0, '');
		// @ts-ignore
		expect(workTogether.hasNecessaryOptions()).toBeFalsy();
	});

	it('returns true if all options are present and selfIdentify is correct', () => {
		const fieldThis = {
			custom: {
				workTogether: {
					selfIdentify: 'START',
					purposeModel: 'model',
					validateText: 'my text',
				},
			},
		};
		const workTogether = new WorkTogether(fieldThis, 0, '');
		// @ts-ignore
		expect(workTogether.hasNecessaryOptions()).toBe(true);
	});

	it('returns true if all options are present and selfIdentify is correct', () => {
		const fieldThis = {
			custom: {
				workTogether: {
					selfIdentify: 'START',
					purposeModel: 'model',
					validateText: 'my text',
				},
			},
		};
		const workTogether = new WorkTogether(fieldThis, 0, '');
		// @ts-ignore
		expect(workTogether.hasNecessaryOptions()).toBe(true);
	});
});

describe('WorkTogether.compareByStart | .compareByEnd', () => {
	const format = 'yyyy-mm-dd';
	const fieldThis = {
		custom: {
			workTogether: {
				selfIdentify: 'START',
				purposeModel: 'model',
				validateText: 'my error text',
			},
		},
	};
	const workTogether = new WorkTogether(fieldThis, 0, '');
	// @ts-ignore
	workTogether.format = format;

	// noinspection DuplicatedCode
	it('.compareByStart: no errors', () => {
		// when user enters start date, finish date must be bigger than start date
		// @ts-ignore
		workTogether.inputValue = parseDate('2020-07-01', workTogether.format);
		// @ts-ignore
		const finishDate = '2020-07-02';
		// @ts-ignore
		expect(workTogether.compareByStart(finishDate)).toBe('');
	});

	it('.compareByStart: date equals', () => {
		// @ts-ignore
		workTogether.inputValue = parseDate('2020-07-01', workTogether.format);
		// @ts-ignore
		const finishDate = '2020-07-01';
		// @ts-ignore
		expect(workTogether.compareByStart(finishDate)).toBe('my error text');
	});

	it('.compareByStart: finish date is less than start', () => {
		// @ts-ignore
		workTogether.inputValue = parseDate('2020-07-01', workTogether.format);
		// @ts-ignore
		const finishDate = '2020-06-20';
		// @ts-ignore
		expect(workTogether.compareByStart(finishDate)).toBe('my error text');
	});

	// noinspection DuplicatedCode
	it('.compareByEnd: no errors', () => {
		// when user enters finish date, start date must be less than finish date
		// @ts-ignore
		workTogether.inputValue = parseDate('2020-07-01', workTogether.format);
		// @ts-ignore
		const startDate = '2020-06-20';
		// @ts-ignore
		expect(workTogether.compareByEnd(startDate)).toBe('');
	});

	it('.compareByEnd: date equals', () => {
		// @ts-ignore
		workTogether.inputValue = parseDate('2020-07-01', workTogether.format);
		// @ts-ignore
		const startDate = '2020-07-01';
		// @ts-ignore
		expect(workTogether.compareByEnd(startDate)).toBe('my error text');
	});

	it('.compareByEnd: start date is bigger than finish', () => {
		// @ts-ignore
		workTogether.inputValue = parseDate('2020-07-01', workTogether.format);
		// @ts-ignore
		const startDate = '2020-07-02';
		// @ts-ignore
		expect(workTogether.compareByEnd(startDate)).toBe('my error text');
	});
});
