<template>
	<div class="row row-item" :style="getStyleObj()">
		<Field
			v-for="(field, index) in row.fields"
			:key="index"
			:group-index="groupIndex"
			:fieldset-index="fieldsetIndex"
			:field-params="field"
		/>
	</div>
</template>

<script>
import Field from '@/components/field';

export default {
	name: 'Row',
	components: {
		Field,
	},

	props: {
		row: {
			type: Object,
			required: true,
			default: () => ({
				styles: {},
			}),
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

	methods: {
		getStyleObj() {
			const obj = {};

			if (this.row.styles?.['justify-content']) {
				obj['justify-content'] = this.row.styles['justify-content'];
			}

			return obj;
		},
	},
};
</script>
