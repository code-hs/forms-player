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
		process(cActioner) {
			if (!cActioner || !cActioner.action.type) return;

			// noinspection JSUnresolvedVariable
			const app = this.$root.$el;
			const elements = cActioner.getPurposeElements(app);

			if (!elements) {
				console.error('ActionerDisplayer: purpose element not found');
				return;
			}

			for (const elem of elements) {
				if (cActioner.action.type === 'SHOW_CONTAINER') {
					elem.hidden = false;
				} else if (cActioner.action.type === 'HIDE_CONTAINER') {
					elem.hidden = true;
				}
			}
		},
	},
};
</script>
