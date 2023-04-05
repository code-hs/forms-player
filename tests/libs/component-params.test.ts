import {describe, it, expect} from '@jest/globals';
import {ComponentParams} from '@/libs/components/component/component-params';

describe('ComponentParams', () => {
	it('ComponentParams class -> text, pass params', () => {
		const obj = ComponentParams.text;
		// @ts-ignore
		const params = obj.default();

		expect(params.placeholder).toBe('');
		expect(params.label).toBe('');
	});
});
