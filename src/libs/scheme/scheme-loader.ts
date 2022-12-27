import {Scheme} from '@/libs/scheme/scheme-structure';

export class SchemeLoader {
	static scheme: Scheme;
	static getData(): Scheme {
		if (this.scheme) return this.scheme;
		// Loader made api request and received a scheme
		// then Loader wrote to localStorage.
		// And we are already reading the data here
		const schemeJSON: string | null = localStorage.getItem('WDFL:init:scheme');
		if (!schemeJSON) {
			throw new Error('SchemeLoader.getData: scheme is empty');
		}

		this.scheme = JSON.parse(schemeJSON);
		return this.scheme;
	}
}
