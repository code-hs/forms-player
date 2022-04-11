import {SchemeLoader} from './SchemeLoader';

export class SchemeParser {
	_scheme;

	load() {
		this._scheme = SchemeLoader.getData();

		if (!this.isValidStructure()) {
			throw new Error('SchemeParser.load: scheme is empty');
		}

		return this._scheme;
	}

	isValidStructure() {
		return this._scheme && Object.keys(this._scheme).length;
	}

	/**
	 * @param {string} pageName
	 * @returns {Object|false}
	 */
	getPageStructure(pageName) {
		if (!pageName) {
			throw new Error('SchemeParser.getPageStructure: param pageName is empty');
		}
		if (!this._scheme || !this._scheme.pages) return false;

		return this._scheme.pages.find(p => p.url === pageName);
	}
}
