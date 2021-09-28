// класс для фильтрации схемы при получении

class SchemeFiltration {
	static filtrateItem(oItem) {
		// scheme param ENABLE,
		// if exists, see value,
		// if non exists, enable = true
		return 'enable' in oItem ? oItem.enable : true;
	}

	static filtrateFields(fields) {
		return fields.filter(field => this.filtrateItem(field));
	}

	static filtrateFieldsets(fieldsets) {
		fieldsets = fieldsets.filter(fieldset => this.filtrateItem(fieldset));

		return fieldsets.map(fieldset => {
			if (!fieldset.fields || !fieldset.fields.length) return fieldset;

			fieldset.fields = this.filtrateFields(fieldset.fields);

			return fieldset;
		});
	}

	static filtrateGroups(groups) {
		// отфильтровали группы, и потом проходим по группам, и если надо ставим дальше фильтрацию
		groups = groups.filter(group => this.filtrateItem(group));

		return groups.map(group => {
			// добавляем фильтрацию в объект multiply
			if ('multiple' in group) {
				group.multiple = this.filtrateItem(group.multiple);
			}

			if (!group.fieldsets || !group.fieldsets.length) return group;

			group.fieldsets = this.filtrateFieldsets(group.fieldsets);

			return group;
		});
	}

	/**
	 * @param {Object} schema - Scheme
	 */
	static filtrateParamEnable(schema) {
		if (!schema.pages || !schema.pages.length) return schema;

		// фильтруем страницы, а потом и все внутреннее запускаем на фильтрацию
		schema.pages = schema.pages.filter(page => this.filtrateItem(page));
		schema.pages = schema.pages.map(page => {
			if (!page.groups || !page.groups.length) return page;

			// запускаем на фильтрацию группы
			page.groups = this.filtrateGroups(page.groups);

			return page;
		});

		return schema;
	}
}

export default SchemeFiltration;
