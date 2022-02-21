<template>
	<div class="row row-item" :style="getStyleObj()">
		<Field
			v-for="field in row.fields"
			:key="field.itemKey"
			:group-index="groupIndex"
			:fieldset-index="fieldsetIndex"
			:field-params="field"
		/>
	</div>
</template>

<script>
import Field from '@/components/field';
import {generateKey} from '@/utils/numbers';

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

	created() {
		this.initFieldsKeys();
	},

	methods: {
		initFieldsKeys() {
			if (!this.row.fields || !this.row.fields.length) return;

			// generate unique keys for each item, since we remove and add these items
			// if this is not done, vue lazily updates the blocks
			this.row.fields.forEach(item => {
				item.itemKey = generateKey();
			});
		},
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
