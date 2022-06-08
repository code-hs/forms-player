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
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper';

const LayoutColumn = () => import('./column');

export default {
	name: 'LayoutColumns',
	components: {
		LayoutColumn,
	},
	props: {
		generalParams: FH.generalParams,
		components: FH.components,
		customParams: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		styles: FH.styles,
		virtualKey: FH.plugN,
		multiboxIndex: FH.multiboxIndex,
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
