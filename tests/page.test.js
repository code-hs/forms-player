import {describe, it, expect} from '@jest/globals';
import {shallowMount} from '@vue/test-utils';
import Page from '../src/components/Page.vue';

describe('Page.vue', () => {
	const wrapper = shallowMount(Page, {
		propsData: {
			page: {
				groups: [],
			},
			inputsStructure: [],
		},
	});

	it('has class 1', () => {
		expect(wrapper.html()).toContain('page-item');
	});

	it('has class 2', () => {
		expect(wrapper.html()).toContain('groups-container');
	});
});
