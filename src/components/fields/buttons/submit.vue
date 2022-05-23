<template>
	<div class="submit">
		<button type="submit" :disabled="disabled">Submit</button>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
	name: 'ButtonSubmit',
	props: {
		generalParams: {
			type: Object,
			required: true,
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
