import {Scheme, Configurations} from '@/libs/scheme/scheme.types';
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
}
