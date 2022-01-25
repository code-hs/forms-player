import Vue from 'vue';
import ModelStructure from '../classes/scheme/ModelStructure';
import {TASK_VALIDATION} from '@/classes/validator/validatorUtils';

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
	currentTask: s => s.task.current,
	task: s => s.task,
	inputs: s => s.inputs,
	hasError: s => {
		// удаляем вложенность
		const structure = s.structure.flat(9);

		// fieldset из объекта превращаем в массив, и потом отдаем все данные по field
		const fieldsDataInArray = structure.map(fieldset =>
			Object.entries(fieldset).map(field => field[1])
		);

		// удаляем вложенность для групп
		const fieldsFlatted = fieldsDataInArray.flat(9);

		// если хотя бы в одном field имеется ошибка
		return fieldsFlatted.some(field => field.error);
	},
};

const mutations = {
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
	updateFieldStatus: (
		s,
		{groupIndex, fieldsetIndex, inputModelName, error}
	) => {
		const item = s.structure[groupIndex][fieldsetIndex][inputModelName];
		item.error = error;
	},
	startValidation: s => {
		s.task.current = TASK_VALIDATION;
		s.inputs.focus = false;
		s.task.answeredInputsCount = 0;
	},
	setFocus: (s, v) => {
		s.inputs.focus = v;
	},
	answeredInputsIncr: s => {
		s.task.answeredInputsCount++;
	},
	setTask: (s, v) => {
		s.task.current = v;
	},
};

const actions = {
	setValidateStatus: ({commit, getters}, isError) => {
		commit('answeredInputsIncr');
		if (getters.task.answeredInputsCount === getters.inputs.count) {
			commit('setTask', '');
		}

		// нет необходимости активировать валидное поле
		if (!isError) return false;

		// focus activated
		if (getters.inputs.focus) return false;

		commit('setFocus', true);

		// go to activate focus
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
