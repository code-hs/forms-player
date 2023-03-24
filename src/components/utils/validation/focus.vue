<template>
	<div />
</template>

<script>
import {bus, busBroadcasts} from '@/libs/utils/bus';
import {Focus} from '@/libs/utils/focus';

export default {
	mounted() {
		// noinspection JSUnresolvedFunction
		bus.$on(busBroadcasts.VALIDATION_FORM_HAS_ERROR, this.hasError);
	},
	methods: {
		hasError() {
			// after each field catch error and update class
			// need wait next tick, for get element by class
			// class will be added after next tick
			this.$nextTick(() => {
				this.processError();
			});
		},
		processError() {
			// noinspection JSUnresolvedVariable
			const app = this.$root.$el;
			const errorFields = app.querySelectorAll(Focus.getSelector());
			// debug
			// const elements = [...errorFields].map(f => f.outerHTML);
			// console.log(elements);

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
					elem.focus({preventScroll: true});
					clearInterval(interval);
				}

				posY = window.scrollY;
			}, 100);
		},
	},
};
</script>
