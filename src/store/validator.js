import {StoreValidator} from '@/classes/validator/StoreValidator';
import {bus} from '@/utils/bus';

const state = () => ({
	fields: [],
	focus: false,
});

const getters = {
	fields: s => s.fields,
	hasError: s => s.fields.some(field => field.error),
	focus: s => s.focus,
};

const mutations = {
	/**
	 * Add field to stack
	 * @param {number} key
	 */
	add: (s, key) => {
		if (!key) throw new Error('validator:add: empty param "key"');

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
		if (!key) throw new Error('validator:destroy: empty param "key"');

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
	update: (s, {key, error, answered}) => {
		if (!key) throw new Error('validator:update: empty param "key"');

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
	setFocus: (s, v) => {
		s.focus = v;
	},
};

const actions = {
	/**
	 * input response to start validation
	 * @param {number} key
	 * @param {boolean} error - field error status
	 * @returns {boolean} - update field focus
	 */
	fieldResponse({commit, getters}, {key, error}) {
		if (!key) throw new Error('validator:fieldResponse: bad param "key"');

		commit('update', {key, error, answered: true});
		const isAllAnswered = getters.fields.every(item => item.answered);
		let toActivateFocus = false;

		if (isAllAnswered) {
			// event for form submit handler, in page.vue
			bus.$emit('VALIDATION:finish', !getters.hasError);
			commit('clearAnsweredInfo');
		}

		// has error and focus empty
		if (error && !getters.focus) {
			toActivateFocus = true;
			commit('setFocus', true);
		}

		return toActivateFocus; // in view
	},
	/**
	 * form create command, start validation all fields
	 */
	start({getters}) {
		if (!getters.fields.length) {
			// if count === 0, validation finish!
			bus.$emit('VALIDATION:finish', true);
			return;
		}

		bus.$emit('VALIDATION:start');
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
