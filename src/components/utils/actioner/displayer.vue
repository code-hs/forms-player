<template>
	<div />
</template>

<script>
import {bus, busBroadcasts} from '@/utils/bus';
import {ActionerL} from '@/libs/utils/actioner';

export default {
	name: 'ActionerDisplayer',
	mounted() {
		// noinspection JSUnresolvedFunction
		bus.$on(busBroadcasts.DISPLAY_CONTAINER, this.process);
	},
	methods: {
		process({startActionElem, action}) {
			if (!startActionElem || !action.type) return;

			// noinspection JSUnresolvedVariable
			const app = this.$root.$el;
			const elem = ActionerL.getPurposeElement(startActionElem, action, app);
			if (!elem) {
				console.error('ActionerDisplayer: Element not found');
				return;
			}

			if (action.type === 'SHOW_CONTAINER') {
				elem.hidden = false;
			} else if (action.type === 'HIDE_CONTAINER') {
				elem.hidden = true;
			}
		},
	},
};
</script>
