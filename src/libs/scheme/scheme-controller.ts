import {SchemeLoader} from './SchemeLoader';
import {SchemeFiltrator} from './scheme-filtrator';
import {Scheme, Page, Configurations} from '@/libs/scheme/schemeStructure';

export class SchemeController {
	private static scheme: Scheme;

	static load(): Scheme {
		this.scheme = SchemeLoader.getData();
		SchemeFiltrator.filtrateParamEnable(this.scheme);

		if (!this.isValid()) {
			throw new Error('SchemeParser.load: scheme is empty');
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
			throw new Error('SchemeParser.getPage: param pageKey is empty');
		}
		if (!this.scheme?.pages) return {};

		return this.scheme.pages.find(p => p.key === pageKey) as Page;
	}
}
