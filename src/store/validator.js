import Vue from 'vue';
import ModelStructure from '../classes/scheme/ModelStructure';
import {TASK_VALIDATION} from '@/classes/validator/validatorUtils';

const state = () => ({
	structure: [],
	inputs: {
		count: 0,
		validatedCount: 0,
	},
	task: '',
	focusInput: false,
});

const getters = {
	structure: s => s.structure,
	task: s => s.task,
	focusInput: s => s.focusInput,
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
		s.task = TASK_VALIDATION;
		s.focusInput = false;
		s.inputs.validatedCount = 0;
	},
	setFocusInput: (s, v) => {
		s.focusInput = v;
	},
	validatedCountInc: s => {
		s.inputs.validatedCount++;
	},
	setTask: (s, v) => {
		s.task = v;
	},
};

const actions = {
	setValidateStatus: ({commit, getters}, isError) => {
		commit('validatedCountInc');
		if (getters.inputs.validatedCount === getters.inputs.count) {
			commit('setTask', '');
		}

		// нет необходимости активировать валидное поле
		if (!isError) return false;

		// focus activated
		if (getters.focusInput) return false;

		commit('setFocusInput', true);

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
