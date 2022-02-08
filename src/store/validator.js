import Vue from 'vue';
import {ModelStructure} from '@/classes/scheme/ModelStructure';
import {TASK_VALIDATION} from '@/classes/validator/validatorUtils';
import {FieldValidator} from '@/classes/validator/FieldValidator';

const state = () => ({
	structure: [],
	inputs: {
		count: 0,
		focus: false,
	},
	task: {
		current: '',
		answeredInputsCount: 0,
	},
});

const getters = {
	structure: s => s.structure,
	inputs: s => s.inputs,
	task: s => s.task,
	currentTask: s => s.task.current,
	taskCompleted: s => s.task.answeredInputsCount === s.inputs.count,
	hasError: s => FieldValidator.hasStructureErrorInput(s.structure),
};

const mutations = {
	// ----------------- STRUCTURE
	generateSkeleton: (s, page) => {
		if (!page) {
			throw new Error('validator: generateSkeleton: bad page');
		}

		s.structure = ModelStructure.generate(page);
	},

	/**
	 * Add file to model structure
	 *
	 * @param {number} groupIndex
	 * @param {number} fieldsetIndex
	 * @param {string} inputModelName
	 */
	initField: (s, {groupIndex, fieldsetIndex, inputModelName}) => {
		if (!inputModelName) {
			throw new Error('validator: initField: bad inputModelName');
		}

		// clarification position
		const fieldset = s.structure[groupIndex][fieldsetIndex];
		const template = {
			error: false,
		};

		Vue.set(fieldset, inputModelName, template);

		// logic after add the item
		s.inputs.count++;
		// reset the information about any old task
		s.task.answeredInputsCount = 0;
	},

	/**
	 * Remove fieldset from current group
	 *
	 * @param {number} groupIndex
	 * @param {number} fieldsetIndex
	 */
	removeFieldsetItem: (s, {groupIndex, fieldsetIndex}) => {
		s.structure[groupIndex].splice(fieldsetIndex, 1);
	},

	/**
	 * Add new fieldset item to structure
	 *
	 * @param {number} groupIndex
	 */
	copyFieldsetItem: (s, {groupIndex}) => {
		const index = 0;
		const sourceItem = s.structure[groupIndex][index];
		if (!sourceItem) {
			throw new Error('validator: copyFieldsetItem: bad sourceItem');
		}

		// without reactivity
		const newItem = JSON.parse(JSON.stringify(sourceItem));
		s.structure[groupIndex].push(newItem);
	},
	// ----------------- END STRUCTURE BLOCK

	/**
	 * after delete the field vue item
	 */
	destroyField: s => {
		s.inputs.count--;
		// reset the information about any old task
		s.task.answeredInputsCount = 0;
	},

	/**
	 * update status  on each change in the input
	 *
	 * @param {number} groupIndex
	 * @param {number} fieldsetIndex
	 * @param {string} inputModelName
	 * @param {boolean} error - field status from data.valid.error
	 */
	updateFieldInfo: (s, {groupIndex, fieldsetIndex, inputModelName, error}) => {
		if (!inputModelName) {
			throw new Error('validator: updateFieldInfo: bad inputModelName');
		}

		const item = s.structure[groupIndex][fieldsetIndex][inputModelName];
		item.error = error;
	},
	startValidation: s => {
		s.task.current = TASK_VALIDATION;
		s.inputs.focus = false;
		s.task.answeredInputsCount = 0;
	},
	clearTask: s => {
		s.task.current = '';
	},
	inputAnswered: s => {
		s.task.answeredInputsCount++;
	},
	setFocus: (s, v) => {
		s.inputs.focus = v;
	},
};

const actions = {
	/**
	 * input response to an incoming task
	 *
	 * @param commit
	 * @param getters
	 * @param fieldError
	 * @returns {boolean} - update field focus
	 */
	responseOnTask({commit, getters}, fieldError) {
		commit('inputAnswered');
		if (getters.task.answeredInputsCount === getters.inputs.count) {
			commit('clearTask');
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
