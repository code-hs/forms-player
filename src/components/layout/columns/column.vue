<template>
	<div
		v-if="hasContent"
		class="columns__column"
		:class="classes"
		v-bind="attrs.container"
	>
		<VirtualComponent
			v-for="(component, index) in components"
			:key="index"
			:scheme-options="component"
			:multibox-index="multiboxIndex"
		/>
	</div>
</template>

<script>
import {ComponentParams as CP} from '@/libs/components/component/component-params';
import {LayoutColumns} from '@/libs/components/layout/columns/layout-columns';

const VirtualComponent = () => import('@/components/virtual-component');

export default {
	name: 'Column',
	components: {
		VirtualComponent,
	},
	props: {
		...CP.getAllParams(),
		attrs: CP.attrsOnlyContainer,
		custom: {
			type: Object,
			required: false,
			default: () => ({
				col: '',
				childCount: 0,
			}),
		},
	},
	data() {
		return {
			classes: LayoutColumns.getColumnClasses(this),
			hasContent: this.components && this.components.length,
		};
	},
};
</script>
