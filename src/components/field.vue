<template>
	<div class="col-6 field-item">
		<component
			:is="fieldParams.component"
			:group-index="groupIndex"
			:fieldset-index="fieldsetIndex"
			v-bind="fieldParams"
		/>
	</div>
</template>

<script>
import InputText from '@/components/fields/inputs/text';

export default {
	name: 'Field',
	components: {
		InputText,
	},
	props: {
		groupIndex: {
			type: Number,
			required: true,
		},
		fieldsetIndex: {
			type: Number,
			required: true,
		},
		// все поля по текущему field
		fieldParams: {
			type: Object,
			required: true,
		},
	},
};
</script>
