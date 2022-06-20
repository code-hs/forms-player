import {Scheme} from '@/classes/scheme/Structure';

export class SchemeLoader {
	static getData(): Scheme {
		// Loader made api request and received a scheme
		// then Loader wrote to localStorage.
		// And we are already reading the data here
		const schemeJSON: string | null = localStorage.getItem('WDFL:init:scheme');
		if (!schemeJSON) {
			throw new Error('SchemeLoader.getData: scheme is empty');
		}

		return JSON.parse(schemeJSON);
	}
}
