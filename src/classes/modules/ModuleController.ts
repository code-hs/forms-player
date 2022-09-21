import {SchemeController} from '@/classes/scheme/SchemeController';
import {Configurations, Module, ModuleConfig} from '@/classes/scheme/structure';
import {SmartTimeout} from '@/utils/SmartTimeout';
import {delay} from '@/utils/asinchronius';

export class ModuleController {
	static async waitWhenLoaded(checker: Function, smtt: SmartTimeout) {
		while (!checker()) {
			// module files are not loaded -> wait, then try again
			if (smtt.totalTime >= 1500) {
				// after 1500ms, module are not loaded, call failLoad function
				throw new Error('module not loaded');
			}

			// eslint-disable-next-line no-await-in-loop
			await delay(+smtt);
		}

		return true;
	}

	static getModuleConfig(moduleName: string): ModuleConfig {
		const module: Module | undefined = this.getModule(moduleName);
		if (!module) {
			console.error(
				`InitModule.getModuleConfig: module '${moduleName}' is not found`
			);
			return {};
		}

		return module.config || {};
	}

	private static getModule(moduleName: string): Module | undefined {
		const configuration: Configurations = SchemeController.getConfig();
		const modules: Module[] = configuration.modules || [];

		return modules.find(m => m.name === moduleName);
	}
}
