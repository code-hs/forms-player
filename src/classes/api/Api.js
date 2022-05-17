import {Config} from '@/config/index';

export class Api {
	static projectId = '';
	static appId = '';

	/**
	 * @param {string} projectId
	 * @param {string} appId - unique id for current client
	 */
	static init(projectId, appId) {
		if (!projectId || !appId) {
			throw new Error('Api.install: prop "projectId" or "appId" is empty');
		}

		this.projectId = projectId;
		this.appId = appId;
	}

	/**
	 * @returns {{appId: string, projectId: string}}
	 */
	static getProjectInfo() {
		return {
			projectId: this.projectId,
			appId: this.appId,
		};
	}

	/**
	 *
	 * @param {string} url
	 * @param {Object} data - inputs values
	 * @param {Object} options
	 * @returns {Promise<any>}
	 */
	static async post(url, data, options = {}) {
		const sendData = {
			...this.getProjectInfo(),
			...data,
		};

		return fetch(Config.apiUrl + url, {
			method: 'POST',
			body: JSON.stringify(sendData),
			headers: {
				'Content-Type': 'application/json',
			},
			...options,
		})
			.then(r => {
				if (!r.ok) throw Error('bad request 1.');
				return r.json();
			})
			.catch(() => {
				throw Error('bad request 2.');
			});
	}
}
