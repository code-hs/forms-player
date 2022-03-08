/* eslint-disable global-require */

class SchemeParser {
	_structure;

	load() {
		if (process.env.CUSTOM_RUN_COMMAND === 'serve') {
			// when run via SERVE
			// schema is taken from folder in api project
			// since HRM is needed, and for this everything must be connected directly

			// !! for a prod build, comment these blocks
			this._structure = require('../../../../api/classes/scheme/tempSource/mainSchemeStructure.json');
			const {
				SchemeFiltrator,
			} = require('../../../../api/classes/scheme/SchemeFiltrator');
			this._structure = SchemeFiltrator.filtrateParamEnable(this._structure);
		} else {
			// Loader made api request and received a schema
			// then Loader wrote to localStorage.
			// And we are already reading the data here
			const storageKey = 'WDFL:init:schemeStructure';
			this._structure = localStorage.getItem(storageKey);
			if (!this._structure) {
				throw new Error('SchemeParser: load: bad this.structure');
			}
			this._structure = JSON.parse(this._structure);
		}
		// is valid scheme
		if (!this.isValidStructure()) {
			throw new Error('SchemeParser: load: not valid structure');
		}

		return this._structure;
	}

	isValidStructure() {
		return this._structure && Object.keys(this._structure).length;
	}

	getPage(urlHash) {
		if (!urlHash) {
			throw new Error('SchemeParser: getPage: bad urlHash');
		}
		if (!this._structure || !this._structure.pages) return false;

		return this._structure.pages.find(p => p.url === urlHash);
	}
}

export {SchemeParser};
