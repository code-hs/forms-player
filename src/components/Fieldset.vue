<template>
	<div class="frm__gnrtr-fieldset-item">
		<div class="frm__gnrtr-title">{{ fieldset.name }}</div>

		<div class="frm__gnrtr-fields-container">
			<Field
				v-for="(field, index) in fieldset.fields"
				:key="index"
				:field-params="field"
				:inputs-structure="inputsStructure"
				:group-index="groupIndex"
				:fieldset-index="fieldsetIndex"
			/>
		</div>

		<div
			v-if="enableMultiple"
			v-show="showButRemove"
			class="frm__gnrtr-button-remove"
			@click="$emit('remove', fieldsetIndex)"
		>
			✖
		</div>
	</div>
</template>

<script>
import Field from './Field';

export default {
	name: 'Fieldset',
	components: {
		Field,
	},
	props: {
		fieldset: {
			type: Object,
			required: true,
		},
		fieldsetsCount: {
			type: Number,
			required: true,
		},
		inputsStructure: {
			// global input values store
			type: Array,
			required: true,
		},
		groupIndex: {
			type: Number,
			required: true,
		},
		fieldsetIndex: {
			type: Number,
			required: true,
		},
		// enable multiply in scheme for group
		enableMultiple: {
			type: Boolean,
			required: true,
		},
	},

	computed: {
		showButRemove() {
			return this.fieldsetsCount > 1;
		},
	},
};
</script>

<style scoped lang="scss">
@import '../assets/styles/fieldset';
</style>
