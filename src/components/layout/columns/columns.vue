<template>
	<div class="columns" :style="getStyleObj()">
		<LayoutColumn
			v-for="(column, columnIndex) in components"
			:key="columnIndex"
			v-bind="column"
			:multibox-index="multiboxIndex"
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
		styles: FP.styles,
		virtualKey: FP.plugN,
		multiboxIndex: FP.multiboxIndex,
	},

	methods: {
		getStyleObj() {
			const obj = {};

			const paramJC = 'justify-content';
			if (this.styles?.[paramJC]) {
				obj[paramJC] = this.styles[paramJC];
			}

			const paramAI = 'align-items';
			if (this.styles?.[paramAI]) {
				obj[paramAI] = this.styles[paramAI];
			}

			return obj;
		},
	},
};
</script>
