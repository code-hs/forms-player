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
	// ######### STRUCTURE
	setStructure: (s, v) => {
		s.structure = v;
	},
	generateStructure: (s, page) => {
		s.structure = ModelStructure.generate(page);
	},
	initField: (s, {groupIndex, fieldsetIndex, inputModelName}) => {
		const fieldset = s.structure[groupIndex][fieldsetIndex];
		const template = {
			error: false,
		};

		Vue.set(fieldset, inputModelName, template);
		s.inputs.count++;
	},

	removeFieldsetItem: (s, {groupIndex, fieldsetIndex}) => {
		// отправляемся в модель текущей группы, и удаляем из нее fieldset
		s.structure[groupIndex].splice(fieldsetIndex, 1);
	},

	/**
	 * Add new fieldset item to structure
	 * @param s
	 * @param {number} groupIndex
	 */
	copyFieldsetItem: (s, {groupIndex}) => {
		const exampleIndex = 0;
		const exampleItem = s.structure[groupIndex][exampleIndex];
		// without reactivity
		const newItem = JSON.parse(JSON.stringify(exampleItem));
		s.structure[groupIndex].push(newItem);
	},
	// ######### END STRUCTURE

	updateFieldInfo: (s, {groupIndex, fieldsetIndex, inputModelName, error}) => {
		const item = s.structure[groupIndex][fieldsetIndex][inputModelName];

		item.error = error;
	},
	startValidation: s => {
		s.task.current = TASK_VALIDATION;
		s.inputs.focus = false;
		s.task.answeredInputsCount = 0;
	},
	completeTask: s => {
		s.task.current = '';
	},
	setFocus: (s, v) => {
		s.inputs.focus = v;
	},
	answeredInputsPlus: s => {
		s.task.answeredInputsCount++;
	},
};

const actions = {
	responseOnTask({commit, getters}, fieldError) {
		commit('answeredInputsPlus');
		if (getters.task.answeredInputsCount === getters.inputs.count) {
			commit('completeTask');
		}

		// нет необходимости активировать валидное поле
		// or if focus activated
		// return focusActivate = false
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
