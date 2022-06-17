import {describe, it, expect} from '@jest/globals';
import {
	StoreValidator,
	ValidatorField,
} from '@/classes/validator/StoreValidator';

describe('StoreValidator class -> findIndex', () => {
	const fields: ValidatorField[] = [
		{
			key: 741032728838,
			error: false,
			answered: false,
		},
		{
			key: 258347799078,
			error: false,
			answered: false,
		},
		{
			key: 273224082960,
			error: false,
			answered: false,
		},
		{
			key: 463874750336,
			error: false,
			answered: false,
		},
		{
			key: 917049390237,
			error: false,
			answered: false,
		},
	];

	it('correct work', () => {
		const key = 917049390237;
		const index = StoreValidator.findIndex(fields, key);
		expect(index).toBe(4);
	});
});
