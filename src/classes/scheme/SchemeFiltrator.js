class SchemeFiltrator {
	/**
	 * scheme param ENABLE,
	 * if exists, see value,
	 * if non exists, enable = true
	 * @param {Object} item
	 */
	static _isEnableObject(item) {
		return 'enable' in item ? item.enable : true;
	}

	/**
	 * @param {Object[]} fields
	 */
	static _filtrateFields(fields) {
		return fields.filter(field => this._isEnableObject(field));
	}

	/**
	 * @param {Object[]} rows
	 */
	static _filtrateRows(rows) {
		// filtrate rows
		rows = rows.filter(rows => this._isEnableObject(rows));

		// walk over the fields
		return rows.map(row => {
			if (row.fields && row.fields.length) {
				row.fields = this._filtrateFields(row.fields);
			}

			return row;
		});
	}

	/**
	 * @param {Object[]} fieldsets
	 */
	static _filtrateFieldsets(fieldsets) {
		// filtrate fieldsets
		fieldsets = fieldsets.filter(fieldset => this._isEnableObject(fieldset));

		// walk over the rows
		return fieldsets.map(fieldset => {
			if (fieldset.rows && fieldset.rows.length) {
				fieldset.rows = this._filtrateRows(fieldset.rows);
			}

			return fieldset;
		});
	}

	/**
	 * @param {Object[]} groups - groups in the page
	 */
	static _filtrateGroups(groups) {
		// filtrate groups
		groups = groups.filter(group => this._isEnableObject(group));

		// walk over the fieldsets
		return groups.map(group => {
			if (group.fieldsets && group.fieldsets.length) {
				group.fieldsets = this._filtrateFieldsets(group.fieldsets);
			}

			// filtrate the multiple object
			if ('multiple' in group) {
				if (!this._isEnableObject(group.multiple)) delete group.multiple;
			}

			return group;
		});
	}

	/**
	 * @param {Object} scheme
	 */
	static filtrateParamEnable(scheme) {
		if (!scheme.pages || !scheme.pages.length) {
			return scheme;
		}

		// filtrate pages
		scheme.pages = scheme.pages.filter(page => this._isEnableObject(page));
		// walk over the groups
		scheme.pages = scheme.pages.map(page => {
			if (page.groups && page.groups.length) {
				page.groups = this._filtrateGroups(page.groups);
			}

			return page;
		});

		return scheme;
	}
}

exports.SchemeFiltrator = SchemeFiltrator;
