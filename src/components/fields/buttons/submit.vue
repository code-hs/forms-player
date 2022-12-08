<template>
	<div class="submit" :class="common.class" v-bind="attrs">
		<!--suppress JSUnresolvedFunction -->
		<button type="submit" :disabled="disabled">{{ $t(text.text) }}</button>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {FieldL as FL} from '@/libs/components/field/field';

export default {
	name: 'ButtonSubmit',
	props: {
		common: FL.common,
		attrs: FL.attrs,
		custom: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		validation: FL.plugO,
		virtualKey: FL.plugN,
		multiboxIndex: FL.plugN,
		text: FL.plugO,
		html: FL.plugO,
		styles: FL.plugO,
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
