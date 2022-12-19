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
import {FieldL as FL} from '@/libs/components/field/field';
import {LayoutColumns} from '@/libs/components/layout/columns/layout-columns';

const VirtualComponent = () => import('@/components/virtual-component');

export default {
	name: 'LayoutColumn',
	components: {
		VirtualComponent,
	},
	props: {
		common: FL.common,
		attrs: FL.attrsOnlyContainer,
		custom: {
			type: Object,
			required: false,
			default: () => ({
				col: '',
				childCount: 0,
			}),
		},
		multiboxIndex: FL.multiboxIndex,
		components: FL.components,
	},

	data() {
		return {
			classes: LayoutColumns.getColumnClasses(this),
			hasContent: this.components && this.components.length,
		};
	},
};
</script>
