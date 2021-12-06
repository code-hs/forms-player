import {describe, it, expect} from '@jest/globals';
import {shallowMount} from '@vue/test-utils';
import Vue from 'vue';
import Group from '../../src/components/Group';

describe('Group.vue', () => {
	const fieldsets = [{}];
	const wrapper = shallowMount(Group, {
		propsData: {
			group: {
				name: 'test',
				fieldsets,
				multiple: true,
			},

			groupIndex: 0,
			modelStructure: [
				[
					{
						login: '',
						surname: '',
					},
				],
			],
		},
	});
	const {vm} = wrapper;

	it('has class fieldsets-container', () => {
		expect(wrapper.html()).toContain('fieldsets-container');
	});

	it('fieldsets-container items length truth', () => {
		expect(wrapper.findAll('.fieldsets-container > fieldset-stub').length).toBe(
			fieldsets.length
		);
	});

	it('press button + && add new fieldset', () => {
		// добавляем новый блок с полями
		const length = fieldsets.length + 1;
		wrapper.find('.button-add').trigger('click');

		Vue.nextTick(() => {
			expect(
				wrapper.findAll('.fieldsets-container > fieldset-stub').length
			).toBe(length);
		});
	});

	it('press button - && remove fieldset', () => {
		// при удалении блока полей, проверяем, уменьшилось ли количество этих
		// блоков
		const length = fieldsets.length - 1;
		vm.handleButRemove(1);

		Vue.nextTick(() => {
			expect(
				wrapper.findAll('.fieldsets-container > fieldset-stub').length
			).toBe(length);
		});
	});
});
