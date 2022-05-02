<template>
	<div>
		<div class="row">
			<div
				v-for="(column, index) in customParams.columns"
				:key="index"
				class="col-6"
			>
				<div class="title">{{ column.name }}</div>

				<div v-if="Object.keys(column).length">
					<VirtualComponent
						v-for="(component, indexx) in column.components"
						:key="indexx"
						:component-data="component"
						:component-index="indexx"
					/>
				</div>
			</div>
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
.row {
	display: flex;
}
.col-6 {
	width: 43%;
	text-align: center;
}
</style>
