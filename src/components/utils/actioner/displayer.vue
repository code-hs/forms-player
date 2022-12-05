<template>
	<div />
</template>

<script>
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'ActionerDisplayer',
	mounted() {
		// noinspection JSUnresolvedFunction
		bus.$on(busBroadcasts.DISPLAY_CONTAINER, this.process);
	},
	methods: {
		process(action) {
			console.log(action);
			// console.log('process');
			// noinspection JSUnresolvedVariable
			// const app = this.$root.$el;
			// const selector =
			// 	".field[data-v-error='true'] input, .field[data-v-error='true'] textarea";
			// const errorFields = app.querySelectorAll(selector);
			// if (!errorFields.length) {
			// 	throw new Error('validation > focus: No error fields found');
			// }
		},
	},
};
</script>
