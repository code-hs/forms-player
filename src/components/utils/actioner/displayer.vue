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
			const elements = cAction.getPurposeElements(app);
			console.log(elements);

			if (!elements) {
				console.error('ActionerDisplayer: purpose element not found');
				return;
			}

			for (const elem of elements) {
				if (cAction.action.type === 'SHOW_CONTAINER') {
					elem.hidden = false;
				} else if (cAction.action.type === 'HIDE_CONTAINER') {
					elem.hidden = true;
				}
			}
		},
	},
};
</script>
