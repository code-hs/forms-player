import {describe, it, expect} from '@jest/globals';
import {Api, ProjectInfo} from '@/classes/api/Api';

describe('Api class', () => {
	it('correct work func getProjectInfo', () => {
		// @ts-ignore
		let info: ProjectInfo = Api.getProjectInfo();
		expect(info.projectId).toBe('');

		Api.init('projectId', 'appId');
		// @ts-ignore
		info = Api.getProjectInfo();

		expect(info.projectId).toBe('projectId');
		expect(info.appId).toBe('appId');
	});
});
