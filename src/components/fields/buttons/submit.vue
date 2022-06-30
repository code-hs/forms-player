<template>
	<div class="submit" :class="common.class">
		<button type="submit" :disabled="disabled">{{ $t(text.text) }}</button>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper.ts';

export default {
	name: 'ButtonSubmit',
	props: {
		common: FH.common,
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
