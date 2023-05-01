import {describe, it, expect} from '@jest/globals';
import {Global} from '../global';

describe('Global class', () => {
	it('.getAppId, correct work', () => {
		const appId = Global.getAppId();
		expect(Global.getAppId()).toBe(appId);
		expect(Global.getAppId()).toBe(appId);
		expect(Global.getAppId()).toBe(appId);

		expect(typeof appId).toBe('string');
	});
});
