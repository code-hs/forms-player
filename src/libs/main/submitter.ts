import type {Page, Configurations} from '@/libs/scheme/scheme.types';
import type {ModelStructureStore} from '@/libs/model/model-structure';
import {SchemeController} from '@/libs/scheme/scheme-controller';
import {Storage} from '@/libs/model/storage';

export class Submitter {
	page: Page;
	values: ModelStructureStore;

	constructor(page: Page, values: ModelStructureStore) {
		this.page = page;
		this.values = values;

		this.saveValues();
	}

	private saveValues(): void {
		const key: string = `saved-page-model:${this.page.key}`;
		Storage.save(key, this.values);
	}

	static getValues(key: string): ModelStructureStore | null {
		const fullKey: string = `saved-page-model:${key}`;
		return Storage.get(fullKey) as ModelStructureStore | null;
	}

	getUrl(): string {
		const schemeConfig: Configurations = SchemeController.getConfig();
		const apiBaseUrl = schemeConfig?.apiBaseUrl;

		if (!apiBaseUrl || !this.page.submitActionUrl) return '';

		return apiBaseUrl + this.page.submitActionUrl;
	}
}
