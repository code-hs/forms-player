<template>
	<div class="submit">
		<button type="submit" :disabled="disabled">Submit</button>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {FieldPropser as FP} from '@/classes/components/field/FieldPropser';

export default {
	name: 'ButtonSubmit',
	props: {
		generalParams: FP.generalParams,
		customParams: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		validation: FP.plugO,
		itemKey: FP.plugN,
		multiboxIndex: FP.plugN,
		text: FP.plugO,
		html: FP.plugO,
		styles: FP.plugO,
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
