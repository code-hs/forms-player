// noinspection DuplicatedCode

import {describe, it, expect} from '@jest/globals';
import {parseDate as p} from '@/utils/dateparser';

describe('dateparser', () => {
	const format1 = 'mm/dd/yyyy';
	it('correct dates, format mm/dd/yyyy', () => {
		expect(p('01/01/2020', format1)).toBe(1577829600000);
		expect(p('01/31/2020', format1)).toBe(1580421600000);
		expect(p('02/01/2020', format1)).toBe(1580508000000);
		expect(p('02/29/2020', format1)).toBe(1582927200000);
		expect(p('03/01/2020', format1)).toBe(1583013600000);
		expect(p('03/31/2020', format1)).toBe(1585602000000);
		expect(p('04/01/2020', format1)).toBe(1585688400000);
		expect(p('04/30/2020', format1)).toBe(1588194000000);

		expect(p('09/01/2022', format1)).toBe(1661979600000);
		expect(p('09/30/2022', format1)).toBe(1664485200000);

		// short dates
		expect(p('1/1/2020', format1)).toBe(1577829600000);
		expect(p('9/1/2022', format1)).toBe(1661979600000);
		expect(p('9/30/2022', format1)).toBe(1664485200000);
	});

	it('incorrect days, format1 mm/dd/yyyy', () => {
		expect(() => {
			p('00/01/2020', format1);
		}).toThrow();
		expect(() => {
			p('-1/01/2020', format1);
		}).toThrow();
		expect(() => {
			p('aa/01/2020', format1);
		}).toThrow();
		expect(() => {
			p('13/01/2020', format1);
		}).toThrow();
		expect(() => {
			p('123/01/2020', format1);
		}).toThrow();
	});

	it('incorrect days, format mm/dd/yyyy', () => {
		expect(() => {
			p('01/00/2020', format1);
		}).toThrow();
		expect(() => {
			p('01/0/2020', format1);
		}).toThrow();
		expect(() => {
			p('01/aa/2020', format1);
		}).toThrow();
		expect(() => {
			p('01/132/2020', format1);
		}).toThrow();

		expect(() => {
			p('01/32/2020', format1);
		}).toThrow();
		expect(() => {
			p('02/30/2020', format1);
		}).toThrow();
		expect(() => {
			p('03/32/2020', format1);
		}).toThrow();
		expect(() => {
			p('04/32/2020', format1);
		}).toThrow();
		expect(() => {
			p('05/32/2020', format1);
		}).toThrow();
		expect(() => {
			p('06/31/2020', format1);
		}).toThrow();
		expect(() => {
			p('07/32/2020', format1);
		}).toThrow();
		expect(() => {
			p('08/32/2020', format1);
		}).toThrow();

		expect(() => {
			p('09/31/2022', format1);
		}).toThrow();
		expect(() => {
			p('10/32/2022', format1);
		}).toThrow();
		expect(() => {
			p('11/31/2022', format1);
		}).toThrow();
		expect(() => {
			p('12/32/2022', format1);
		}).toThrow();
		expect(() => {
			p('01/32/2023', format1);
		}).toThrow();
	});

	it('incorrect date (empty parts), format1 mm/dd/yyyy', () => {
		// if empty months or days
		expect(() => {
			p('/01/2020', format1);
		}).toThrow();
		expect(() => {
			p('01//2020', format1);
		}).toThrow();
		expect(() => {
			p('//2020', format1);
		}).toThrow();
		expect(() => {
			p('1/1/', format1);
		}).toThrow();
		expect(() => {
			p('1/1/0', format1);
		}).toThrow();
		expect(() => {
			p('//', format1);
		}).toThrow();
		// @ts-ignore
		expect(() => p('', format1).toUndefined());
	});

	// test another formats
	const format2 = 'dd/mm/yyyy';
	it('correct dates, format dd/mm/yyyy', () => {
		expect(p('01/01/2020', format2)).toBe(1577829600000);
		expect(p('31/01/2020', format2)).toBe(1580421600000);
		expect(p('01/02/2020', format2)).toBe(1580508000000);
		expect(p('29/02/2020', format2)).toBe(1582927200000);

		expect(p('01/09/2022', format2)).toBe(1661979600000);
		expect(p('30/09/2022', format2)).toBe(1664485200000);

		// short dates
		expect(p('1/1/2020', format2)).toBe(1577829600000);
		expect(p('1/9/2022', format2)).toBe(1661979600000);
		expect(p('30/9/2022', format2)).toBe(1664485200000);
	});

	const format3 = 'dd.mm.yyyy';
	it('correct dates, format mm/dd/yyyy', () => {
		expect(p('01.01.2020', format3)).toBe(1577829600000);
		expect(p('31.01.2020', format3)).toBe(1580421600000);
		expect(p('01.09.2022', format3)).toBe(1661979600000);
		expect(p('30.09.2022', format3)).toBe(1664485200000);

		// short dates
		expect(p('1.1.2020', format3)).toBe(1577829600000);
		expect(p('1.9.2022', format3)).toBe(1661979600000);
		expect(p('30.9.2022', format3)).toBe(1664485200000);
	});

	const format4 = 'dd-mm-yyyy';
	it('correct dates, format dd-mm-yyyy', () => {
		expect(p('01-01-2020', format4)).toBe(1577829600000);
		expect(p('31-01-2020', format4)).toBe(1580421600000);
		expect(p('01-09-2022', format4)).toBe(1661979600000);
		expect(p('30-09-2022', format4)).toBe(1664485200000);

		// short dates
		expect(p('1-1-2020', format4)).toBe(1577829600000);
		expect(p('1-9-2022', format4)).toBe(1661979600000);
		expect(p('30-9-2022', format4)).toBe(1664485200000);
	});
});
