export interface ListItem {
	readonly id: number | string;
	readonly pageId: number | string;
	readonly position?: number;
	readonly enable: boolean;
	readonly title: string;
}

export type MenuList = ListItem[];
