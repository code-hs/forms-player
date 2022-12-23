<template>
	<div />
</template>

<script>
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'ActionerDisabler',
	mounted() {
		// noinspection JSUnresolvedFunction
		bus.$on(busBroadcasts.ENABLE_DISABLE_INPUT, this.process);
	},
	methods: {
		process(cActioner) {
			if (!cActioner || !cActioner.action.type) return;

			// noinspection JSUnresolvedVariable
			const app = this.$root.$el;
			const elements = cActioner.getPurposeElements(app);

			if (!elements) {
				return console.error('ActionerDisplayer: purpose element not found');
			}

			// for (const elem of elements) {
			// if (cActioner.action.type === 'SHOW_CONTAINER') {
			// elem.hidden = false;
			// } else if (cActioner.action.type === 'HIDE_CONTAINER') {
			// elem.hidden = true;
			// }
			// }
		},
	},
};
</script>
