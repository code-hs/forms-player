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
		showMultipleSeparator() {
			// отображаем только при включенном multiple в блоке, а так же при наличии
			// двух и более блоков

			return this.enableMultiple && this.showButRemove;
		},
	},
};
</script>
