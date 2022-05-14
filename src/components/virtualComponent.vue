<template>
	<div>
		<component
			:is="componentData.generalParams.component"
			v-bind="componentData"
			:multibox-index="multiboxIndex"
		/>
	</div>
</template>

<script>
import InputText from '@/components/fields/inputs/text';

// async import for the box components
const LayoutColumns = () => import('@/components/layout/columns');
const MultiBox = () => import('@/components/layout/multibox/multiBox');

export default {
	name: 'VirtualComponent',
	components: {
		InputText,
		LayoutColumns,
		MultiBox,
	},
	props: {
		componentData: {
			type: Object,
			required: true,
		},
		multiboxIndex: {
			type: Number,
			required: false,
			default: -1,
		},
	},
};
</script>
