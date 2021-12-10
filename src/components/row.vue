<template>
	<div class="row-item">
		<div class="title">{{ row.name }}</div>

		<div class="fields-container">
			<Field
				v-for="(field, index) in row.fields"
				:key="index"
				:group-index="groupIndex"
				:fieldset-index="fieldsetIndex"
				:field-params="field"
			/>
		</div>
	</div>
</template>

<script>
import Field from '@/components/Field';

export default {
	name: 'Row',
	components: {
		Field,
	},
	props: {
		row: {
			type: Object,
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
