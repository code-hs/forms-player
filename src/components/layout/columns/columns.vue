<template>
	<div class="columns" :style="getStyleObj()">
		<LayoutColumn
			v-for="(column, columnIndex) in components"
			:key="columnIndex"
			:column="column"
		/>
	</div>
</template>

<script>
import {FieldPropser as FP} from '@/classes/components/field/FieldPropser';

const LayoutColumn = () => import('./column');

export default {
	name: 'LayoutColumns',
	components: {
		LayoutColumn,
	},
	props: {
		generalParams: FP.generalParams,
		components: FP.components,
		customParams: {
			type: Object,
			required: false,
			default: () => ({}),
		},
	},

	methods: {
		getStyleObj() {
			const obj = {};

			if (this.customParams?.['justify-content']) {
				obj['justify-content'] = this.customParams['justify-content'];
			}

			return obj;
		},
	},
};
</script>
