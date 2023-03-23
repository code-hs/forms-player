import {Scheme, Page} from '@/libs/scheme/scheme.types';
import {SchemeController} from '@/libs/scheme/scheme-controller';

export class PagesController {
	getScheme: Scheme;

	constructor() {
		this.getScheme = SchemeController.getScheme();
	}

	getPages(): Page[] {
		if (!this.getScheme?.pages) return [];

		return this.getScheme.pages;
	}

	getPage(pageKey: string): Page {
		if (!pageKey) {
			throw new Error('SchemeController.getPage: param pageKey is empty');
		}
		if (!this.getPages()) return {};

		return this.getPages().find(p => p.key === pageKey) as Page;
	}

	getPageById(id: number): Page | undefined {
		return this.getPages().find(page => page.id === id);
	}
}
