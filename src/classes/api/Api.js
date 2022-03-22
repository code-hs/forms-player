import axios from 'axios';
import {Config} from '@/config/index';

export class Api {
	static projectId = '';
	static appId = '';
	static axios = {};

	/**
	 * @param {String} projectId
	 * @param {String} appId - unique id for current client
	 */
	static install(projectId, appId) {
		if (!projectId) throw new Error('Api: install: bad prop "projectId');

		this.projectId = projectId;
		this.appId = appId;

		this.axios = axios.create({
			baseURL: Config.apiUrl,
		});
	}

	/**
	 *
	 * @returns {{appId: string, projectId: string}}
	 */
	static getProjectInfo() {
		return {
			projectId: this.projectId,
			appId: this.appId,
		};
	}
}
