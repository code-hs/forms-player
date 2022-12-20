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
		common: CP.common,
		attrs: CP.attrs,
		custom: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		validation: CP.plugO,
		virtualKey: CP.plugN,
		multiboxIndex: CP.plugN,
		text: CP.plugO,
		html: CP.plugO,
		styles: CP.plugO,
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
