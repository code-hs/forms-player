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
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper.ts';

const LayoutColumn = () => import('./column');

export default {
	name: 'LayoutColumns',
	components: {
		LayoutColumn,
	},
	props: {
		common: FH.common,
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

	created() {
		this.initChildCount();
	},

	methods: {
		initChildCount() {
			if (!this.components || !this.components.length) return;

			this.components.forEach(component => {
				if (!component.customParams) component.customParams = {};

				component.customParams.childCount = this.components.length;
			});
		},
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
