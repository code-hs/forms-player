import Vue from 'vue';
import ModelStructure from '../classes/scheme/ModelStructure';
import {TASK_VALIDATION} from '@/classes/validator/validatorUtils';

const state = () => ({
	structure: [],
	task: '',
});

const getters = {
	structure: s => s.structure,
	task: s => s.task,
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
			// objectType: 'inputValidation',
			error: false,
		};

		Vue.set(fieldset, inputModelName, template);
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
	setFieldStatus: (s, {groupIndex, fieldsetIndex, inputModelName, error}) => {
		const item = s.structure[groupIndex][fieldsetIndex][inputModelName];
		item.error = error;
	},
	startValidation: s => {
		s.task = TASK_VALIDATION;
		// s.inputs.validatedCount = 0;
	},
	finishValidation: s => {
		s.task = null;
		// s.inputs.validatedCount = 0;
	},
};

// if (isError && !getters.hasError) {
// 	commit('setHasError', true);
// 	setFocusActive = true;
// }

const actions = {};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
