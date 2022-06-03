import {StoreValidator} from '@/classes/validator/StoreValidator';

const state = () => ({
	fields: [],
});

const getters = {
	fields: s => s.fields,
	isAllAnswered: s => s.fields.every(field => field.answered),
	hasError: s => s.fields.some(field => field.error),
};

const mutations = {
	/**
	 * Add field to stack
	 * @param {number} key
	 */
	add: (s, key) => {
		if (!key) throw new Error('validator.add: param "key" is empty');

		const template = {
			key,
			error: false,
			answered: false,
		};
		s.fields.push(template);
	},
	/**
	 * after delete the field vue component
	 * @param {number} fieldKey
	 */
	destroy: (s, key) => {
		if (!key) throw new Error('validator.destroy: param "key" is empty');

		const index = StoreValidator.findIndex(s.fields, key);
		s.fields.splice(index, 1);
	},
	/**
	 * update data on each change in the field
	 * @param {number} key
	 * @param {boolean} error - field error status
	 * @param {boolean} answered - field answered on validation task
	 * @param {boolean} error - field status from data.valid.error
	 */
	update: (s, {key, error, answered = undefined}) => {
		if (!key) throw new Error('validator.update: param "key" is empty');

		const index = StoreValidator.findIndex(s.fields, key);

		// set data
		if (error !== undefined) s.fields[index].error = error;
		if (answered !== undefined) s.fields[index].answered = answered;
	},
	clearAnsweredInfo: s => {
		s.fields.forEach(field => {
			field.answered = false;
		});
	},
};

const actions = {
	/**
	 * field response on event "start validation"
	 * @param {number} key - field key
	 * @param {boolean} error - field error status
	 */
	fieldResponse({commit, getters}, {key, error}) {
		if (!key) throw new Error('validator.fieldResponse: param "key" is empty');

		commit('update', {key, error, answered: true});
		if (!getters.isAllAnswered) return;
		commit('clearAnsweredInfo');

		if (getters.hasError) {
			// event for validation>focus for set focus to first error field
			StoreValidator.commands.formHasError();
			return;
		}

		// event for form submit handler, in form.vue
		StoreValidator.commands.finishSuccess();
	},
	/**
	 * form create command, start validation all fields
	 */
	start({getters}) {
		if (getters.fields.length === 0) {
			// if count === 0, validation finish!
			StoreValidator.commands.finishSuccess();
			return;
		}

		StoreValidator.commands.start();
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
