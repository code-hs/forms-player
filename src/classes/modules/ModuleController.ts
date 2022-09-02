import {SchemeController} from '@/classes/scheme/SchemeController';
import {
	Configurations,
	Module,
	ModuleOptions,
} from '@/classes/scheme/structure';
import {SmartTimeout} from '@/utils/SmartTimeout';

export class ModuleController {
	static init(
		checker: Function,
		successLoad: Function,
		failLoad: Function | null = null,
		smtt: SmartTimeout
	) {
		if (checker()) {
			successLoad();
			return;
		}

		// module files are not loaded -> wait, then try again
		if (smtt.totalTime >= 1500) {
			// after 1500ms, module are not loaded, call failLoad function
			if (failLoad) failLoad();
			return;
		}

		setTimeout(() => {
			this.init(checker, successLoad, failLoad, smtt);
		}, +smtt);
	}

	static getModuleOptions(moduleName: string): ModuleOptions {
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
