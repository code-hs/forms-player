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
const LayoutColumn = () => import('./column');

export default {
	name: 'LayoutColumns',
	components: {
		LayoutColumn,
	},
	props: {
		generalParams: {
			type: Object,
			required: true,
		},
		customParams: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		components: {
			type: Array,
			required: false,
			default: () => [],
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

<style scoped>
.columns-container {
	display: flex;
}
</style>
