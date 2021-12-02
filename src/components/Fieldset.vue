<template>
	<div class="fieldset-item">
		<div class="title">{{ fieldset.name }}</div>

		<div class="fields-container">
			<Field
				v-for="(field, index) in fieldset.fields"
				:key="index"
				:group-index="groupIndex"
				:fieldset-index="fieldsetIndex"
				:field-params="field"
			/>
		</div>

		<div
			v-if="enableMultiple"
			v-show="showButRemove"
			class="button-remove"
			@click="$emit('remove', fieldsetIndex)"
		>
			✖
		</div>
	</div>
</template>

<script>
import Field from '@/components/Field';

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
		groupIndex: {
			type: Number,
			required: true,
		},
		fieldsetIndex: {
			type: Number,
			required: true,
		},
		fieldsetsCount: {
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
			// отображаем кнопку удалить, ток при наличии двух и более fieldset item
			return this.fieldsetsCount > 1;
		},
	},
};
</script>
