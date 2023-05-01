import {Global} from '@/libs/main/global';

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
	static init(projectId: string): void {
		if (!projectId) {
			throw new Error('Api.init: prop "projectId" is empty');
		}

		this.projectId = projectId;
		this.appId = Global.getAppId();
	}

	private static getProjectInfo(): ProjectInfo {
		return {
			projectId: this.projectId,
			appId: this.appId,
		};
	}

	// eslint-disable-next-line require-await
	static async post(url: string, data: object, options: object = {}): Promise<any> {
		const sendData = {
			...this.getProjectInfo(),
			...data,
		};

		return fetch(url, {
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
