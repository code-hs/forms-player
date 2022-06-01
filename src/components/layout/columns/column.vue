<template>
	<div v-if="hasContent" class="column" :class="getClasses()">
		<div v-for="(component, index) in components" :key="index">
			<VirtualComponent :scheme-options="component" />
		</div>
	</div>
</template>

<script>
import {FieldPropser as FP} from '@/classes/components/field/FieldPropser';

const VirtualComponent = () => import('@/components/virtualComponent');

export default {
	name: 'LayoutColumn',
	components: {
		VirtualComponent,
	},
	props: {
		generalParams: FP.generalParams,
		customParams: FP.customParams,
		components: FP.components,
	},

	computed: {
		hasContent() {
			return this.generalParams && this.components.length;
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
