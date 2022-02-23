import {bus} from '@/utils/bus';
import {StoreValidator} from '@/classes/validator/StoreValidator';

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
	 * Add file to stack
	 * @param {number} fieldKey
	 */
	add: (s, key) => {
		const template = {
			key,
			error: false,
			answered: false,
		};
		s.fields.push(template);
	},

	/**
	 * after delete the field vue item
	 * @param {number} fieldKey
	 */
	destroy: (s, key) => {
		const index = StoreValidator.findIndex(s.fields, key);
		s.fields.splice(index, 1);
	},

	/**
	 * update status  on each change in the input
	 * @param {number} key
	 * @param {boolean} error - field status from data.valid.error
	 */
	update: (s, {key, error, answered}) => {
		if (!key) throw new Error('validator:updateFieldInfo: bad param key');

		const index = StoreValidator.findIndex(s.fields, key);

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
	 * input response to an incoming task
	 * @param fieldError
	 * @returns {boolean} - update field focus
	 */
	fieldResponse({commit, getters}, {key, error}) {
		commit('update', {key, error, answered: true});
		const isAllAnswered = getters.fields.every(item => item.answered);

		if (isAllAnswered) {
			bus.$emit('VALIDATION:finish', !getters.hasError);
			commit('clearAnsweredInfo');

			// dont update focus
			return false;
		}

		// if no errors in the field or the focus is already activated
		if (!error || getters.focus) return false;

		// go to activate focus flag
		commit('setFocus', true);
		// activate focus in view
		return true;
	},
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
