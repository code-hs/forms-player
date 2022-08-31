import {SchemeController} from '@/classes/scheme/SchemeController';
import {Configurations, Module} from '@/classes/scheme/structure';

export class ModuleController {
	static init(
		checker: Function,
		successLoad: Function,
		failLoad: Function | null = null,
		failLoadCount = 5
	) {
		if (!checker()) {
			// module files are not loaded
			// wait, then try again
			// eslint-disable-next-line no-param-reassign
			failLoadCount--;
			if (failLoadCount === 0) {
				// after 5 tries, 1500ms, module are not loaded, call failLoad function
				if (failLoad) failLoad();

				return;
			}

			setTimeout(() => {
				this.init(checker, successLoad, failLoad, failLoadCount);
			}, 300);
			return;
		}

		successLoad();
	}

	static getModuleOptions(moduleName: string): object {
		const module: Module | undefined = this.getModule(moduleName);
		if (!module) {
			console.error(
				`InitModule.getModuleOptions: module '${moduleName}' is not found`
			);
			return {};
		}

		return module.options || {};
	}

	private static getModule(moduleName: string): Module | undefined {
		const configuration: Configurations = SchemeController.getConfig();
		const modules: Module[] = configuration.modules || [];

		return modules.find(m => m.name === moduleName);
	}
}
