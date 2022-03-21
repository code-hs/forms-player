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
		groupIndex: {
			type: Number,
			required: true,
		},
		fieldsetIndex: {
			type: Number,
			required: true,
		},
		// below params from v-bind
		generalParams: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			value: '',
		};
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
