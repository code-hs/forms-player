import {Config} from '@/config';
import {ModelStructure} from '@/libs/model/ModelStructure';

export interface ProjectInfo {
	projectId: string;
	appId: string;
}

export class Api {
	static projectId = '';
	static appId = '';

	/**
	 * @param {string} appId - unique id for current client
	 */
	static init(projectId: string, appId: string): void {
		if (!projectId || !appId) {
			throw new Error('Api.init: prop "projectId" or "appId" is empty');
		}

		this.projectId = projectId;
		this.appId = appId;
	}

	private static getProjectInfo(): ProjectInfo {
		return {
			projectId: this.projectId,
			appId: this.appId,
		};
	}

	/**
	 * @param {Object} data - inputs values
	 */
	// eslint-disable-next-line require-await
	static async post(
		url: string,
		data: ModelStructure,
		options: object = {}
	): Promise<any> {
		const sendData = {
			...this.getProjectInfo(),
			...data,
		};
		const fullLink: string = Config.apiUrl + url;

		return fetch(fullLink, {
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
