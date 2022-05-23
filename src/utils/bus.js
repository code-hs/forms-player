import Vue from 'vue';

export const bus = new Vue();

export const busBroadcasts = {
	VALIDATION_START: 'VALIDATION:start',
	VALIDATION_END: 'VALIDATION:end',
};
