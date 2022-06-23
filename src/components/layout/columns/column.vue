<template>
	<div v-if="hasContent" class="column" :class="getClasses()">
		<VirtualComponent
			v-for="(component, index) in components"
			:key="index"
			:scheme-options="component"
			:multibox-index="multiboxIndex"
		/>
	</div>
</template>

<script>
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper.ts';
import {LayoutColumns} from '@/classes/components/layout/columns/LayoutColumns.ts';

const VirtualComponent = () => import('@/components/virtualComponent');

export default {
	name: 'LayoutColumn',
	components: {
		VirtualComponent,
	},
	props: {
		generalParams: FH.generalParams,
		customParams: {
			type: Object,
			required: false,
			default: () => ({
				col: '',
				childCount: 0,
			}),
		},
		components: FH.components,
		multiboxIndex: FH.multiboxIndex,
	},

	computed: {
		hasContent() {
			return this.generalParams && this.components.length;
		},
	},

	methods: {
		getClasses() {
			return LayoutColumns.getColumnClasses(this);
		},
	},
};
</script>
