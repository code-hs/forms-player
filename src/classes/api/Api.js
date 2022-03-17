import axios from 'axios';
import {Config} from '@/config/index';

export class Api {
	static projectId = '';
	static appId = '';
	static axiosObj = {};

	/**
	 *
	 * @param {String} projectId
	 * @param {String} appId - unique id for current client
	 */
	static install(projectId, appId) {
		if (!projectId) throw new Error('Api: install: bad prop "projectId');

		this.projectId = projectId;
		this.appId = appId;

		this.axiosObj = axios.create({
			baseURL: Config.apiUrl,
		});
	}

	/**
	 * @param {Object} pageStructure - current page structure
	 * @param {Object} values - store model/structure
	 */
	static send(pageStructure, values) {
		const url = 'form/save-form';
		const sendData = {
			projectId: this.projectId,
			appId: this.appId,
			pageKey: pageStructure.key,
			values,
		};
		this.axiosObj.post(url, sendData);
	}
}
