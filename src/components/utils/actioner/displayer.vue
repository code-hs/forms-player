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
		process({startActionElem, action}) {
			if (!startActionElem || !action.type) return;

			const elem = this.getElement(startActionElem, action);
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
		getElement(startActionElem, action) {
			// noinspection JSUnresolvedVariable
			const app = this.$root.$el;

			if (action.container) {
				return app.querySelector(action.container);
			}
			if (action.nextSibling === 1) {
				return startActionElem.nextSibling;
			}
			if (action.nextSibling === 2) {
				return startActionElem.nextSibling.nextSibling;
			}
			if (action.nextSibling === 3) {
				return startActionElem.nextSibling.nextSibling.nextSibling;
			}
		},
	},
};
</script>
