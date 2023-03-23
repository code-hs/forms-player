export interface ModuleMenuPage {
	readonly id: number | string;
	readonly pageId: number | string;
	readonly position?: number;
	readonly enable: boolean;
	readonly title: string;
}
