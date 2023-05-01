import {generateHash} from '@/utils/random';

type Hash = string;

export class Global {
	private static appId: Hash = '';

	static getAppId(): Hash {
		if (!this.appId) this.appId = generateHash();

		// id for the app, for api ddos protection
		return this.appId;
	}
}
