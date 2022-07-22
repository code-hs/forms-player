import {describe, it, expect} from '@jest/globals';
import {deepCopy, getValueByStringKey, isObject} from '@/utils/objects';

describe('objects', () => {
	it('.getValueByStringKey', () => {
		const store = {
			en: {
				'app-title': 'title en',
				'dir-1': {
					'dir-1-1': 'text en',
				},
			},
			fr: {
				'app-title': 'title fr',
				'dir-1': {
					'dir-1-1': 'text fr',
				},
			},
		};

		const r = getValueByStringKey('en.app-title', store);

		expect(r).toEqual('title en');
	});

	it('.deepCopy', () => {
		const obj1 = {
			en: {
				'app-title': 'title en',
				'dir-1': {
					'dir-1-1': 'text en',
				},
			},
			fr: {
				'app-title': 'title fr',
				'dir-1': {
					'dir-1-1': 'text fr',
				},
			},
		};

		const obj2 = deepCopy(obj1);
		obj1.en['app-title'] = 'new title en';

		expect(obj2.en['app-title']).toEqual('title en');
	});

	it('.isObject', () => {
		expect(isObject({})).toBeTruthy();
		expect(isObject(111)).toBeFalsy();
		expect(isObject('111111')).toBeFalsy();
		expect(isObject(null)).toBeFalsy();
		expect(isObject(undefined)).toBeFalsy();
		expect(isObject(false)).toBeFalsy();
		expect(isObject(true)).toBeFalsy();
		expect(isObject(NaN)).toBeFalsy();
		expect(isObject([])).toBeFalsy();
		expect(isObject(() => {})).toBeFalsy();
	});
});
