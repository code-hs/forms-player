<template>
	<div class="submit" :class="classes.container" v-bind="attrs.container">
		<!--suppress JSUnresolvedFunction -->
		<button type="submit" :disabled="disabled" v-bind="attrs.component">
			{{ $t(text.text) }}
		</button>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {ComponentParams as CP} from '@/libs/components/component/component-params';
import {FieldL as FL} from '@/libs/components/field/field';

export default {
	name: 'ButtonSubmit',
	props: {
		...CP.getAllParams(),
	},
	data() {
		return {
			classes: FL.getClasses(this.common),
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
