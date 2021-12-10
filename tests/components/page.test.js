import {describe, it, expect} from '@jest/globals';
import {shallowMount} from '@vue/test-utils';
import Page from '../../src/components/page.vue';

describe('Page.vue', () => {
	const groups = [{}, {}, {}];

	const wrapper = shallowMount(Page, {
		propsData: {
			page: {
				groups,
			},
			modelStructure: [],
		},
	});

	it('has class groups-container', () => {
		expect(wrapper.html()).toContain('groups-container');
	});

	it('groups-container length truth', () => {
		expect(wrapper.findAll('.groups-container > group-stub').length).toBe(
			groups.length
		);
	});
});
