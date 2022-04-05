export class SchemeLoader {
	static getData() {
		let scheme;

		// Loader made api request and received a scheme
		// then Loader wrote to localStorage.
		// And we are already reading the data here
		scheme = localStorage.getItem('WDFL:init:scheme');
		if (!scheme) {
			throw new Error('SchemeLoader: getData: bad scheme');
		}
		scheme = JSON.parse(scheme);

		return scheme;
	}
}
