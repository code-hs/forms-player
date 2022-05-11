<template>
	<div v-if="Object.keys(column).length" class="col-6">
		<div class="title">{{ column.customParams.name }}</div>

		<div
			v-for="(component, componentIndex) in column.components"
			:key="componentIndex"
		>
			<template v-if="Object.keys(column.components).length">
				<VirtualComponent :component-data="component" />
			</template>
		</div>
	</div>
</template>

<script>
const VirtualComponent = () => import('@/components/virtualComponent');

export default {
	name: 'LayoutColumn',
	components: {
		VirtualComponent,
	},
	props: {
		// below params from v-bind
		generalParams: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		customParams: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		column: {
			type: Object,
			required: true,
		},
	},

	created() {
		// console.logp(this.column);
	},
};
</script>

<style scoped>
.col-6 {
	width: 43%;
	text-align: center;
}
</style>
