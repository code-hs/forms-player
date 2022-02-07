/* eslint-disable global-require */

class SchemeParser {
	structure;

	load() {
		if (process.env.CUSTOM_RUN_COMMAND === 'serve') {
			// when run via SERVE
			// schema is taken from folder in api project
			// since HRM is needed, and for this everything must be connected directly

			// !! for a prod build, comment these blocks
			this.structure = require('../../../../api/classes/scheme/tempSource/mainSchemeStructure.json');
			const SchemaFiltrator = require('../../../../api/classes/scheme/SchemeFiltrator');
			this.structure = SchemaFiltrator.filtrateParamEnable(this.structure);
		} else {
			// Loader made api request and received a schema
			// then Loader wrote to localStorage.
			// And we are already reading the data here
			const storageKey = 'WDFL:init:schemeStructure';
			this.structure = localStorage.getItem(storageKey);
			this.structure = JSON.parse(this.structure);
		}
		// is valid scheme
		if (!this.isValidStructure()) return false;

		return this.structure;
	}

	isValidStructure() {
		return this.structure && Object.keys(this.structure).length;
	}

	getPage(urlHash) {
		if (!this.structure || !this.structure.pages) return false;

		return this.structure.pages.find(p => p.url === urlHash);
	}
}

export {SchemeParser};
