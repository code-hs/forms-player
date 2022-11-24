<template>
	<div v-if="hasContent" class="columns__column" :class="classes">
		<VirtualComponent
			v-for="(component, index) in components"
			:key="index"
			:scheme-options="component"
			:multibox-index="multiboxIndex"
		/>
	</div>
</template>

<script>
import {FieldL as FH} from '@/libs/components/field/FieldL';
import {LayoutColumns} from '@/libs/components/layout/columns/LayoutColumns';

const VirtualComponent = () => import('@/components/virtualComponent');

export default {
	name: 'LayoutColumn',
	components: {
		VirtualComponent,
	},
	props: {
		common: FH.common,
		custom: {
			type: Object,
			required: false,
			default: () => ({
				col: '',
				childCount: 0,
			}),
		},
		multiboxIndex: FH.multiboxIndex,
		components: FH.components,
	},

	data() {
		return {
			classes: LayoutColumns.getColumnClasses(this),
			hasContent: this.components && this.components.length,
		};
	},
};
</script>
