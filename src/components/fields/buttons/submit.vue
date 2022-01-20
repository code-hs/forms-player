<template>
	<div class="submit">
		<button type="submit" :disabled="validatorHasError">Submit</button>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
	name: 'Checkbox',
	props: {
		groupIndex: {
			type: Number,
			required: true,
		},
		fieldsetIndex: {
			type: Number,
			required: true,
		},
		// ниже значения идут от, v-bind
		generalParams: {
			type: Object,
			required: true,
		},
		customParams: {
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
			modelStructure: 'model/structure',
			validatorHasError: 'validator/hasError',
		}),
	},
};
</script>
