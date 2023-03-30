import {describe, it, expect} from '@jest/globals';
import {SchemeController} from '@/libs/scheme/scheme-controller';
import {MenuList} from '@/libs/modules/page-menu/menu.types';
import {PageMenu} from '@/libs/modules/page-menu/page-menu';

describe('PageMenu class', () => {
	// @ts-ignore
	SchemeController.scheme = {
		config: {
			modules: [
				{
					name: 'menu',
					enable: true,
					config: {
						list: [
							{
								id: 1,
								pageId: 1,
								position: 0,
								enable: true,
								title: 'Welcome title',
							},
							{
								id: 2,
								pageId: 2,
								position: 1,
								enable: false,
								title: 'Second title',
							},
						],
					},
				},
			],
		},
	};

	const listMenu: MenuList = new PageMenu().getList();

	it('-> getList', () => {
		expect(typeof listMenu).toBe('object');
		expect(Array.isArray(listMenu)).toBeTruthy();
	});

	it('-> filterItems', () => {
		// one item is disabled (enable: false)
		expect(listMenu.length).toBe(1);
	});
});
