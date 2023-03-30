import {PageMenu} from '@/libs/modules/page-menu/page-menu';

export class Burger {
	isEnable(): boolean {
		return new PageMenu().isEnable();
	}
}
