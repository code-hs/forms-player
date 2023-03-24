import {Scheme, Page} from '@/libs/scheme/scheme.types';
import {SchemeController} from '@/libs/scheme/scheme-controller';

export class PagesController {
	getScheme: Scheme;

	constructor() {
		this.getScheme = SchemeController.getScheme();
	}

	getAll(): Page[] {
		if (!this.getScheme?.pages) return [];

		return this.getScheme.pages;
	}

	getByKey(pageKey: string): Page {
		if (!pageKey) {
			throw new Error('SchemeController.getPage: param pageKey is empty');
		}
		if (!this.getAll()) return {};

		return this.getAll().find(p => p.key === pageKey) as Page;
	}

	getById(id: number): Page | undefined {
		return this.getAll().find((page: Page) => page.id === id);
	}
}
