<template>
	<div>
		<component
			:is="componentData.generalParams.component"
			v-bind="componentData"
			:group-index="groupIndex"
		/>
	</div>
</template>

<script>
import InputText from '@/components/fields/inputs/text';

// async import for the box components
const LayoutColumns = () => import('@/components/layout/columns');
const MultiBox = () => import('@/components/layout/multiBox');

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
		groupIndex: {
			type: Number,
			required: false,
			default: -1,
		},
	},

	data() {
		return {};
	},
};
</script>
