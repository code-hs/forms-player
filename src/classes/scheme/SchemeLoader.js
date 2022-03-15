/* eslint-disable global-require */

export class SchemeLoader {
	static getData() {
		let scheme;

		if (process.env.CUSTOM_RUN_COMMAND === 'serve') {
			// when run via SERVE
			// scheme is taken from folder in api project
			// since HRM is needed, and for this everything must be connected directly
			// !! for a prod build, comment these blocks
			this._scheme =
				require('../../../../api/classes/scheme/tempSource/main.js').data;
			const {
				SchemeFiltrator,
			} = require('../../../../api/classes/scheme/SchemeFiltrator');
			scheme = SchemeFiltrator.filtrateParamEnable(this._scheme);
		} else {
			// Loader made api request and received a scheme
			// then Loader wrote to localStorage.
			// And we are already reading the data here
			const storageKey = 'WDFL:init:scheme';
			scheme = localStorage.getItem(storageKey);

			if (!scheme) {
				throw new Error('SchemeLoader: getData: bad scheme');
			}
			scheme = JSON.parse(scheme);
		}

		return scheme;
	}
}
