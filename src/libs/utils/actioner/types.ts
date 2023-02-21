/* eslint-disable no-unused-vars */
export enum ActionTypes {
	SHOW_CONTAINER = 'SHOW_CONTAINER',
	HIDE_CONTAINER = 'HIDE_CONTAINER',

	ADD_CLASS_CONTAINER = 'ADD_CLASS_CONTAINER',
	REMOVE_CLASS_CONTAINER = 'REMOVE_CLASS_CONTAINER',

	ENABLE_INPUT = 'ENABLE_INPUT',
	DISABLE_INPUT = 'DISABLE_INPUT',

	CHECK_ANOTHERS = 'CHECK_ANOTHERS',
	UNCHECK_ANOTHERS = 'UNCHECK_ANOTHERS',
}

export interface Action {
	readonly type: ActionTypes;
	readonly container?: string;
	readonly nextSibling?: number;
	readonly previousSibling?: number;
	readonly [key: string]: any;
}
