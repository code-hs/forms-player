import {describe, it, expect} from '@jest/globals';
import {stringToRegex} from '@/utils/regexp';

describe('regexp', () => {
	it('correct work', () => {
		const regexp = stringToRegex('/^.{2,5}$/');

		expect(regexp.test('a')).toBeFalsy();
		expect(regexp.test('abcdeg')).toBeFalsy();
		expect(regexp.test('ab')).toBeTruthy();
		expect(regexp.test('abcde')).toBeTruthy();
	});
});
