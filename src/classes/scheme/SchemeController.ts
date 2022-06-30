import {SchemeLoader} from './SchemeLoader';
import {SchemeFiltrator} from './SchemeFiltrator';
import {Scheme, Page} from '@/classes/scheme/structure';

export class SchemeController {
	// @ts-ignore
	private scheme: Scheme;

	load(): void {
		this.scheme = SchemeLoader.getData();
		SchemeFiltrator.filtrateParamEnable(this.scheme);

		if (!this.isValid()) {
			throw new Error('SchemeParser.load: scheme is empty');
		}
	}

	isValid(): boolean {
		return !!(this.scheme && this.scheme.pages && this.scheme.pages.length);
	}

	getPage(pageKey: string): Page {
		if (!pageKey) {
			throw new Error('SchemeParser.getPage: param pageKey is empty');
		}
		if (!this.scheme?.pages) return {};

		return this.scheme.pages.find(p => p.key === pageKey) as Page;
	}
}
