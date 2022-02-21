import Vue from 'vue';
import {ModelStructure} from '@/classes/scheme/ModelStructure';
import {FieldValidator} from '@/classes/validator/FieldValidator';
import {bus} from '@/utils/bus';

const state = () => ({
	structure: [],
	inputs: {
		count: 0,
		answeredCount: 0,
		focus: false,
	},
});

const getters = {
	structure: s => s.structure,
	hasError: s => FieldValidator.hasStructureErrorInput(s.structure),
	inputs: s => s.inputs,
};

// noinspection DuplicatedCode
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
		s.inputs.answeredCount = 0;
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
		if (!s.structure || !s.structure[groupIndex]) {
			throw new Error(
				'validator: copyFieldsetItem: bad structure or cant find' +
					' group by groupIndex'
			);
		}

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
		s.inputs.answeredCount = 0;
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
	setFocus: (s, v) => {
		s.inputs.focus = v;
	},

	startTask: s => {
		if (!s.inputs.count) {
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
	 *
	 * @param commit
	 * @param getters
	 * @param fieldError
	 * @returns {boolean} - update field focus
	 */
	responseOnTask({commit, getters}, fieldError) {
		commit('inputAnswered');
		if (getters.inputs.answeredCount === getters.inputs.count) {
			console.log('1');
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
