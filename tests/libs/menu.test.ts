import {describe, it, expect} from '@jest/globals';
import {ModuleConfig} from '@/libs/scheme/scheme.types';
import {SchemeController} from '@/libs/scheme/scheme-controller';
import {ListItem, MenuList} from '@/libs/modules/page-menu/menu.types';
import {ModuleController} from '@/libs/modules/module-controller';

describe('PageMenu class', () => {
	// @ts-ignore
	SchemeController.scheme = {
		config: {
			modules: [
				{
					name: 'menu_1',
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

	it('-> getList, not correct module name', () => {
		const listMenu: false | ModuleConfig = ModuleController.getModuleConfig('menu_not_found');
		expect(listMenu).toBeFalsy();
	});

	it('-> getList, find correct ', () => {
		const listMenu = ModuleController.getModuleConfig('menu_1') as ModuleConfig;

		expect(typeof listMenu).toBe('object');
		expect(Array.isArray(listMenu.list)).toBeTruthy();
		// const filterItems: MenuList = listMenu?.list.filter((menuItem: ListItem) => {
		// 	noinspection RedundantIfStatementJS
		// if ('enable' in menuItem && !menuItem.enable) return false;
		// return true;
		// });
		//
		// expect('enable' in filterItems[0]).toBeTruthy();
	});
});
