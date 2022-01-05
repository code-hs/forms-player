/* eslint-disable global-require */

class SchemeParser {
	structure;

	load() {
		if (process.env.CUSTOM_RUN_COMMAND === 'serve') {
			// при запуске через serve,
			// схема берется из папки в апи
			// так как нужен HRM, а для этого все должно быть подключено напрямую
			// для прод билда, коментить эти блоки
			this.structure = require('../../../../api/classes/scheme/tempSource/mainSchemeStructure.json');
			const SchemaFiltrator = require('../../../../api/classes/scheme/SchemeFiltrator');
			this.structure = SchemaFiltrator.filtrateParamEnable(this.structure);
		} else {
			// loader сделал запрос по апи и получил схему
			// loader и записал в localStorage
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

export default SchemeParser;
