<template>
	<div v-if="hasData" :class="getClasses()">
		<div v-for="(component, index) in column.components" :key="index">
			<template v-if="hasComponents">
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

	computed: {
		hasData() {
			return Object.keys(this.column).length;
		},
		hasComponents() {
			return Object.keys(this.column?.components).length;
		},
	},

	methods: {
		getClasses() {
			let classes = '';

			// col-6, col-12,...
			if (this.customParams.col) {
				classes += `col-${this.customParams.col}`;
			} else {
				// col size default value
				classes += 'col-6';
			}

			return classes;
		},
	},
};
</script>

<style scoped>
.col-6 {
	width: 43%;
	text-align: center;
}
</style>
