<template>
	<div
		class="fieldset-item"
		:data-show-multiple-separator="showMultipleSeparator"
	>
		<!--		<div class="title">{{ fieldset.name }}</div>-->

		<div class="rows-container">
			<Row
				v-for="(row, index) in fieldset.rows"
				:key="index"
				:group-index="groupIndex"
				:fieldset-index="fieldsetIndex"
				:row="row"
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
import Row from '@/components/row';

export default {
	name: 'Fieldset',
	components: {
		Row,
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
		// enable multiply for group
		enableMultiple: {
			type: Boolean,
			required: true,
		},
	},

	computed: {
		showButRemove() {
			// if fieldsets.length > 1 = show but remove
			return this.fieldsetsCount > 1;
		},
		showMultipleSeparator() {
			// if multiply enable and fieldsets.length > 1

			return this.enableMultiple && this.showButRemove;
		},
	},
};
</script>
