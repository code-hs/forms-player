<template>
	<div class="submit" :class="common.class" v-bind="attrs">
		<!--suppress JSUnresolvedFunction -->
		<button type="submit" :disabled="disabled">{{ $t(text.text) }}</button>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {FieldL as FH} from '@/libs/components/field/field';

export default {
	name: 'ButtonSubmit',
	props: {
		common: FH.common,
		attrs: FH.attrs,
		custom: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		validation: FH.plugO,
		virtualKey: FH.plugN,
		multiboxIndex: FH.plugN,
		text: FH.plugO,
		html: FH.plugO,
		styles: FH.plugO,
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
