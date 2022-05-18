export class SchemeFiltrator {
	/**
	 * @param {Object} scheme
	 */
	static filtrateParamEnable(scheme) {
		if (!scheme.pages || !scheme.pages.length) {
			return scheme;
		}

		scheme.pages = scheme.pages.filter(page => this._isEnable(page));

		return scheme;
	}

	/**
	 * @param {Object} component
	 * @returns {boolean}
	 */
	static _isEnable(component) {
		if (!component) return false;
		if (component?.generalParams?.enable === false) return false;
		if (!component.components) return true;

		// if component has children
		// filtrate children by reference
		component.components = component.components.filter(child =>
			this._isEnable(child)
		);

		return true;
	}
}
