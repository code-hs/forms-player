export interface Action {
	readonly type: string;
	readonly container?: string;
	readonly nextSibling?: number;
	readonly previousSibling?: number;
	readonly [key: string]: any;
}
