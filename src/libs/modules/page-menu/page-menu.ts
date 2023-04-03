import {ModuleController} from '@/libs/modules/module-controller';
import {ModuleConfig} from '@/libs/scheme/scheme.types';
import {MenuList, ListItem} from './menu.types';

export class PageMenu {
	list: MenuList = [];

	constructor() {
		const moduleConfig: ModuleConfig | false = ModuleController.getConfig('menu');

		if (!moduleConfig || !moduleConfig?.list) {
			console.error('PageMenu.constructor: pages array with not correct data or empty');
			return;
		}

		this.list = moduleConfig.list;
		this.filterItems();
	}

	getList(): MenuList {
		return this.list;
	}

	isEnable(): boolean {
		return !!this.list.length;
	}

	private filterItems(): void {
		this.list = this.list.filter((menuItem: ListItem) => {
			// noinspection RedundantIfStatementJS
			if ('enable' in menuItem && !menuItem.enable) return false;
			return true;
		});
	}
}
