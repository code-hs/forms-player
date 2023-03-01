<template>
	<div />
</template>

<script>
import {bus, busBroadcasts} from '@/libs/utils/bus';
import {ActionTypes} from '@/libs/utils/actioner/types';

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
			if (!elements) {
				return console.error('ActionerDisplayer: purpose element not found');
			}

			for (const elem of elements) {
				if (cActioner.action.type === ActionTypes.CHECK_ANOTHERS) {
					if (!elem.checked) elem.click();
				} else if (cActioner.action.type === ActionTypes.UNCHECK_ANOTHERS) {
					if (elem.checked) elem.click();
				}
			}
		},
	},
};
</script>
