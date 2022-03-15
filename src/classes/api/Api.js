import axios from 'axios';
import {Config} from '@/config/index';

export class Api {
	static projectId = '';
	static axiosObj = {};

	/**
	 *
	 * @param {String} projectId
	 */
	static install(projectId) {
		if (!projectId) throw new Error('Api: install: bad prop "projectId');

		this.projectId = projectId;
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
			pageKey: pageStructure.key,
			values,
		};
		this.axiosObj.post(url, sendData);
	}
}
