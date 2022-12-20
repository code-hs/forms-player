<template>
	<div class="submit" :class="common.class" v-bind="attrs.container">
		<!--suppress JSUnresolvedFunction -->
		<button type="submit" :disabled="disabled" v-bind="attrs.component">
			{{ $t(text.text) }}
		</button>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {ComponentParams as CP} from '@/libs/components/component/component-params';

export default {
	name: 'ButtonSubmit',
	props: {
		...CP.getAllParams(),
		custom: {
			type: Object,
			required: false,
			default: () => ({}),
		},
	},

	computed: {
		...mapGetters({
			validatorHasError: 'validator/hasError',
			saveFormFinished: 'request/saveFormFinished',
		}),
		disabled() {
			return this.validatorHasError || !this.saveFormFinished;
		},
	},
};
</script>
