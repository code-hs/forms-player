import {Scheme, Page} from '@/libs/scheme/scheme.types';
import {SchemeController} from '@/libs/scheme/scheme-controller';

export class PagesController {
	static getAll(): Page[] {
		const scheme: Scheme = SchemeController.getScheme();

		if (!scheme?.pages) return [];

		return scheme.pages;
	}

	static getByKey(pageKey: string): Page | undefined {
		if (!pageKey) {
			throw new Error('SchemeController.getPage: param pageKey is empty');
		}
		if (!this.getAll()) return {};

		return this.getAll().find(p => p.key === pageKey) as Page;
	}

	static getById(id: number): Page | undefined {
		return this.getAll().find((page: Page) => page.id === id);
	}
}
