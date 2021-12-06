import {describe, it, expect} from '@jest/globals';
import {shallowMount} from '@vue/test-utils';
import Vue from 'vue';
import Fieldset from '../../src/components/Fieldset';

describe('Fieldset.vue', () => {
	const fieldset = {};
	let enableMultiple = true;
	let fieldsetsCount = 2;
	const wrapper = shallowMount(Fieldset, {
		propsData: {
			fieldset,
			fieldsetsCount,
			groupIndex: 0,
			fieldsetIndex: 0,
			modelStructure: [
				[
					{
						login: '',
						surname: '',
					},
				],
			],
			enableMultiple,
		},
	});
	// const {vm} = wrapper;

	it('has class fields-container', () => {
		expect(wrapper.html()).toContain('fields-container');
	});

	it('show button remove', () => {
		// отображаем кнопку удаления,
		// если у нас указана такая опция в схеме, и элементов больше одного.
		// Один - минимально

		expect(wrapper.find('.button-remove').exists()).toBeTruthy();
	});

	it('hide button remove', async () => {
		// reverse upper test

		enableMultiple = false;
		fieldsetsCount = 1;

		wrapper.setProps({
			enableMultiple,
			fieldsetsCount,
		});

		Vue.nextTick(() => {
			expect(wrapper.find('.button-remove').exists()).toBeFalsy();
		});
	});
});
