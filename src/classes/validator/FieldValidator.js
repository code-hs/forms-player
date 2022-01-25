export class FieldValidator {
	static stringToRegex(str) {
		if (!str) throw new Error('empty source string for create regexp');
		// Main regex
		const main = str.match(/\/(.+)\/.*/)[1];
		// Regex options
		const options = str.match(/\/.+\/(.*)/)[1];

		// Compiled regex
		const regexp = new RegExp(main, options);

		if (regexp.constructor.name !== 'RegExp') {
			throw new Error('bad validation pattern (source)');
		}

		return regexp;
	}

	static isValid(validationRules, fieldValue) {
		// если нет каких либо правил в схеме, то поле становиться валидным
		if (!validationRules || !Object.keys(validationRules).length) {
			return true;
		}

		// если нет паттерна, и при этом есть required,
		// то делаем по required проверку
		if (!validationRules.pattern && 'required' in validationRules) {
			// если required === true то делаем проверку поля
			// иначе всегда true, так как required === false
			// и значит никаких проверок для поля
			return validationRules.required ? Boolean(fieldValue) : true;
		}

		// А если и вовсе нет паттерна,
		// то в объекте валидации непонятно что находится
		if (!validationRules.pattern) return true;

		try {
			const regexp = this.stringToRegex(validationRules.pattern);
			return regexp.test(fieldValue);
		} catch {
			throw new Error('bad validation pattern');
		}
	}

	static hasStructureErrorInput(structure) {
		// удаляем вложенность
		const flattedStructure = structure.flat(9);

		// fieldset из объекта превращаем в массив, и потом отдаем все данные по field
		const fieldsDataInArray = flattedStructure.map(fieldset =>
			Object.entries(fieldset).map(field => field[1])
		);

		// удаляем вложенность для групп
		const fieldsFlatted = fieldsDataInArray.flat(9);

		// если хотя бы в одном field имеется ошибка
		return fieldsFlatted.some(field => field.error);
	}
}
