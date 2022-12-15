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
		process(cAction) {
			if (!cAction || !cAction.action.type) return;

			// noinspection JSUnresolvedVariable
			const app = this.$root.$el;
			const elem = cAction.getPurposeElement(app);

			if (!elem) {
				console.error('ActionerDisplayer: purpose element not found');
				return;
			}

			if (cAction.action.type === 'SHOW_CONTAINER') {
				elem.hidden = false;
			} else if (cAction.action.type === 'HIDE_CONTAINER') {
				elem.hidden = true;
			}
		},
	},
};
</script>
