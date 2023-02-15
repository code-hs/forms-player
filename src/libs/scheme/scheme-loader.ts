import {Scheme} from '@/libs/scheme/scheme.types';

export class SchemeLoader {
	private readonly scheme: Scheme;

	constructor() {
		// Loader made api request and received a scheme
		// then Loader wrote to localStorage.
		// And we are already reading the data here
		const schemeJSON: string | null = localStorage.getItem('WDFL:init:scheme');
		if (!schemeJSON) {
			throw new Error('SchemeLoader.constructor: scheme is empty');
		}

		this.scheme = JSON.parse(schemeJSON);
	}

	getScheme(): Scheme {
		return this.scheme;
	}
}
