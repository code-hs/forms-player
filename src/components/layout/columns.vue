<template>
	<div>
		<div class="columns-container row">
			<template v-for="(column, columnIndex) in customParams.columns">
				<div v-if="Object.keys(column).length" :key="columnIndex" class="col-6">
					<div class="title">{{ column.customParams.name }}</div>

					<VirtualComponent
						v-for="(component, index) in column.components"
						:key="index"
						:component-data="component"
					/>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
const VirtualComponent = () => import('@/components/virtualComponent');

export default {
	name: 'LayoutColumns',
	components: {
		VirtualComponent,
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
	},
};
</script>

<style scoped>
.columns-container {
	display: flex;
}

.col-6 {
	width: 43%;
	text-align: center;
}
</style>
