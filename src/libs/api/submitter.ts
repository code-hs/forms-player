import type {Page, Configurations} from '@/libs/scheme/scheme.types';
import type {ModelStructureStore} from '@/libs/model/model-structure';
import {SchemeController} from '@/libs/scheme/scheme-controller';

export class Submitter {
	page: Page;
	values: ModelStructureStore;

	constructor(page: Page, values: ModelStructureStore) {
		this.page = page;
		this.values = values;

		this.saveValues();
	}

	saveValues() {}

	getUrl(): string {
		const schemeConfig: Configurations = SchemeController.getConfig();
		const apiBaseUrl = schemeConfig?.apiBaseUrl;

		if (!apiBaseUrl || !this.page.submitActionUrl) return '';

		return apiBaseUrl + this.page.submitActionUrl;
	}
}
