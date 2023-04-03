import {SchemeController} from '@/libs/scheme/scheme-controller';
import {Configurations, Module, ModuleConfig} from '@/libs/scheme/scheme.types';
import {SmartTimeout} from '@/utils/smart-timeout';
import {delay} from '@/utils/asinchronius';

export class ModuleController {
	static async waitWhenLoaded(checker: Function, smtt: SmartTimeout): Promise<void> {
		// the check function should return true if the module is loaded
		while (!checker()) {
			// module files are not loaded -> wait, then try again

			// fallback variant, for stop infinite loop
			if (smtt.totalTime >= 1500) {
				// after 1500ms, module are not loaded -> throw error
				throw new Error('module not loaded');
			}

			// eslint-disable-next-line no-await-in-loop
			await delay(+smtt);
		}
	}

	static getModuleConfig(moduleName: string): ModuleConfig | false {
		const module: Module | undefined = this.getByName(moduleName);
		if (!module) {
			console.error(`InitModule.getModuleConfig: module '${moduleName}' is not found`);
			return false;
		}
		// noinspection PointlessBooleanExpressionJS
		if (module.enable === false) return false;

		return module.config || {};
	}

	private static getByName(moduleName: string): Module | undefined {
		const configuration: Configurations = SchemeController.getConfig();
		const modules: Module[] = configuration.modules || [];

		return modules.find(m => m.name === moduleName);
	}
}
