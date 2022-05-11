<template>
	<div>
		<div class="columns-container row">
			<LayoutColumn
				v-for="(column, columnIndex) in components"
				:key="columnIndex"
				:column="column"
			/>
		</div>
	</div>
</template>

<script>
const LayoutColumn = () => import('@/components/layout/column');

export default {
	name: 'LayoutColumns',
	components: {
		LayoutColumn,
	},
	props: {
		// below params from v-bind
		generalParams: {
			type: Object,
			required: true,
		},
		customParams: {
			type: Object,
			required: true,
		},
		components: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style scoped>
.columns-container {
	display: flex;
}
</style>
