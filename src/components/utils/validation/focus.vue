<template>
	<div />
</template>

<script>
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	mounted() {
		// noinspection JSUnresolvedFunction
		bus.$on(busBroadcasts.VALIDATION_FORM_HAS_ERROR, this.hasError);
	},
	methods: {
		hasError() {
			// after each field catch error and update class
			this.$nextTick(() => {
				this.processError();
			});
		},

		processError() {
			// noinspection JSUnresolvedVariable
			const app = this.$root.$el;
			const selector =
				".field[data-v-error='true'] input, .field[data-v-error='true'] textarea";
			const errorFields = app.querySelectorAll(selector);

			if (!errorFields.length) {
				throw new Error('validation > focus: No error fields found');
			}

			// move focus to first error field
			const firstErrorElement = errorFields[0];
			this.scrollAndFocusElement(firstErrorElement);
		},

		scrollAndFocusElement(elem) {
			if (!elem) return;

			elem.scrollIntoView({behavior: 'smooth', block: 'center'});
			let posY = window.scrollY;

			const interval = setInterval(() => {
				if (posY === window.scrollY) {
					// scrolling stopped
					elem.focus();
					clearInterval(interval);
				}

				posY = window.scrollY;
			}, 100);
		},
	},
};
</script>
