import {ModuleController} from '@/libs/modules/module-controller';
import {ModuleMenuPage} from '@/libs/scheme/scheme.types';

export class PageMenu {
	static moduleCfg: any;

	static getMenu() {
		const dataMenu = ModuleController.getModuleConfig('menu');
		if (dataMenu && !dataMenu.pages) {
			console.error('page-menu class: pages array with not correct data or empty');
			return;
		}
		if (dataMenu && dataMenu.pages) {
			this.moduleCfg = dataMenu;
		}
		return this.moduleCfg;
	}

	static filteredMenu() {
		// noinspection JSUnresolvedVariable
		if (!this.moduleCfg) return;

		return this.moduleCfg.pages.filter((menuItem: ModuleMenuPage) => {
			// noinspection RedundantIfStatementJS
			if ('enable' in menuItem && !menuItem.enable) return false;
			return true;
		});
	}
}
