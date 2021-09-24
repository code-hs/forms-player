<template>
	<div class="field-item">
		<component
			:is="fieldParams.component"
			v-bind="fieldParams"
			:inputs-structure="inputsStructure"
			:group-index="groupIndex"
			:fieldset-index="fieldsetIndex"
		/>
	</div>
</template>

<script>
import InputText from '@/components/fields/inputs/Text';

export default {
	name: 'Field',
	components: {
		InputText,
	},
	props: {
		fieldParams: {
			type: Object,
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
	},
};
</script>
