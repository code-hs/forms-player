import {SchemeLoader} from './SchemeLoader';

export class SchemeParser {
	_scheme;

	load() {
		this._scheme = SchemeLoader.getData();

		if (!this.isValidStructure()) {
			throw new Error('SchemeParser: load: not valid scheme');
		}

		return this._scheme;
	}

	isValidStructure() {
		return this._scheme && Object.keys(this._scheme).length;
	}

	/**
	 * @param {String} pageName
	 * @returns {Object|false}
	 */
	getPageStructure(pageName) {
		if (!pageName) {
			throw new Error('SchemeParser: getPage: bad urlHash');
		}
		if (!this._scheme || !this._scheme.pages) return false;

		return this._scheme.pages.find(p => p.url === pageName);
	}
}
