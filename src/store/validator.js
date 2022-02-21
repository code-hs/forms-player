// ModelStructure.generate(page);
// import {ModelStructure} from '@/classes/scheme/ModelStructure';
// import {FieldValidator} from '@/classes/validator/FieldValidator';

import {bus} from '@/utils/bus';

function findIndexByFieldKey(stack, key) {
	if (!key) throw new Error('validator: destroyField: bad fieldKey. 1');

	const index = stack.findIndex(item => item.fieldKey === key);
	if (index === -1) {
		throw new Error('validator: destroyField: bad fieldKey. 2');
	}
	return index;
}

const state = () => ({
	stack: [],
	inputs: {
		answeredCount: 0,
		focus: false,
	},
});

const getters = {
	hasError: s => s.stack.some(field => field.error),
	inputs: s => s.inputs,
	stack: s => s.stack,
};

// noinspection DuplicatedCode
const mutations = {
	/**
	 * Add file to stack
	 * @param {number} fieldKey
	 */
	initField: (s, fieldKey) => {
		const template = {
			fieldKey,
			error: false,
		};
		s.stack.push(template);

		// reset the information about any old task ???????????
		s.inputs.answeredCount = 0;
	},

	/**
	 * after delete the field vue item
	 * @param {number} fieldKey
	 */
	destroyField: (s, fieldKey) => {
		const index = findIndexByFieldKey(s.stack, fieldKey);
		s.stack.splice(index, 1);

		// reset the information about any old task
		s.inputs.answeredCount = 0;
	},

	/**
	 * update status  on each change in the input
	 * @param {number} fieldKey
	 * @param {boolean} error - field status from data.valid.error
	 */
	updateFieldInfo: (s, {fieldKey, error}) => {
		if (!fieldKey) throw new Error('validator:updateFieldInfo: bad fieldKey');

		const index = findIndexByFieldKey(s.stack, fieldKey);
		s.stack[index].error = error;
	},
	setFocus: (s, v) => {
		s.inputs.focus = v;
	},

	startTask: s => {
		if (!s.stack.length) {
			// if count === 0, task completed!
			bus.$emit('finish-validation', true);
		}
		s.inputs.answeredCount = 0;
		s.inputs.focus = false;
	},
	finishTask: s => {
		s.inputs.answeredCount = 0;
	},
	inputAnswered: s => {
		s.inputs.answeredCount++;
	},
};

const actions = {
	/**
	 * input response to an incoming task
	 * @param fieldError
	 * @returns {boolean} - update field focus
	 */
	responseOnTask({commit, getters}, fieldError) {
		commit('inputAnswered');
		if (getters.inputs.answeredCount === getters.stack.length) {
			bus.$emit('finish-validation', !getters.hasError);
			commit('finishTask');
			// dont update focus
			return false;
		}

		// if no errors in the field or the focus is already activated
		if (!fieldError || getters.inputs.focus) return false;

		// go to activate focus flag
		commit('setFocus', true);
		// activate focus in view
		return true;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
