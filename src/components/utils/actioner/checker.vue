<template>
	<div />
</template>

<script>
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'ActionerDisplayer',
	mounted() {
		// noinspection JSUnresolvedFunction
		bus.$on(busBroadcasts.CHECKING_INPUT, this.process);
	},
	methods: {
		process(cActioner) {
			// cActioner => libs/utils/actioner/index.ts
			if (!cActioner || !cActioner.action.type) return;

			// noinspection JSUnresolvedVariable
			const app = this.$root.$el;
			const elements = cActioner.getPurposeElements(app);

			console.log(elements);

			if (!elements) {
				return console.error('ActionerDisplayer: purpose element not found');
			}

			for (const elem of elements) {
				if (cActioner.action.type === 'UNCHECK_ANOTHERS') {
					elem.checked = false;
				} else if (cActioner.action.type === 'CHECK_ANOTHERS') {
					elem.checked = true;
				}
			}
		},
	},
};
</script>
