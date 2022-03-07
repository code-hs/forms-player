import axios from 'axios';
import {Config} from '@/config/index';

export class Api {
	static projectId = '';
	static axiosObj = {};

	static install(projectId) {
		if (!projectId) throw new Error('Api: install: bad prop "projectId');

		this.projectId = projectId;
		this.axiosObj = axios.create({
			baseURL: Config.apiUrl,
		});
	}

	static send(page, values) {
		const url = 'form/save-form';
		const sendData = {
			projectId: this.projectId,
			pageKey: page.key,
			values,
		};
		this.axiosObj.post(url, sendData);
	}
}
