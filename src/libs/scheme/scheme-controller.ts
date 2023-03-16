import {Scheme, Page, Configurations} from '@/libs/scheme/scheme.types';
import {SchemeLoader} from './scheme-loader';
import {SchemeFiltrator} from './scheme-filtrator';

export class SchemeController {
	private static scheme: Scheme;

	static load(): Scheme {
		if (this.scheme) return this.scheme;

		this.scheme = new SchemeLoader().getScheme();
		new SchemeFiltrator(this.scheme).filtrate();

		if (!this.isValid()) {
			throw new Error('SchemeController.load: scheme is empty');
		}

		return this.scheme;
	}

	static isValid(): boolean {
		return !!(this.scheme && this.scheme.pages && this.scheme.pages.length);
	}

	static getScheme(): Scheme {
		return this.scheme;
	}

	static getConfig(): Configurations {
		return this.scheme.config;
	}

	static getPage(pageKey: string): Page {
		if (!pageKey) {
			throw new Error('SchemeController.getPage: param pageKey is empty');
		}
		if (!this.scheme?.pages) return {};

		return this.scheme.pages.find(p => p.key === pageKey) as Page;
	}

	static getPages() {
		if (!this.scheme?.pages) return {};

		return this.scheme.pages;
	}
}
