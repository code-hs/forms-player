<template>
	<div>
		<component
			:is="fieldOptions.generalParams.component"
			v-bind="fieldOptions"
			:multibox-index="multiboxIndex"
		/>
	</div>
</template>

<script>
// import InputPassword from '@/components/fields/inputs/password';
// import Selector from '@/components/fields/selector';
// import Textarea from '@/components/fields/inputs/textarea';
// import Checkbox from '@/components/fields/checkbox';
// import ButtonSubmit from '@/components/fields/buttons/submit';

import InputText from '@/components/fields/inputs/text';

// async import for the box components
const LayoutColumns = () => import('@/components/layout/columns/columns');
const MultiBox = () => import('@/components/layout/multibox/multiBox');

export default {
	name: 'VirtualComponent',
	components: {
		InputText,
		LayoutColumns,
		MultiBox,
	},
	props: {
		fieldOptions: {
			type: Object,
			required: true,
		},
		multiboxIndex: {
			type: Number,
			required: false,
			default: -1,
		},
	},
	created() {
		if (!this.fieldOptions?.generalParams) {
			throw new Error('virtualComponent.vue: param generalParams is empty');
		}
		if (!this.fieldOptions?.generalParams?.component) {
			throw new Error(
				'virtualComponent.vue: param component type in generalParams is empty'
			);
		}
	},
};
</script>
