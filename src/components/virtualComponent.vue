<template>
	<component
		:is="schemeOptions.generalParams.type"
		:key="key"
		:item-key="key"
		:multibox-index="multiboxIndex"
		v-bind="schemeOptions"
	/>
</template>

<script>
import InputText from '@/components/fields/inputs/text';
import InputPassword from '@/components/fields/inputs/password';
import Selector from '@/components/fields/selector';
import Textarea from '@/components/fields/inputs/textarea';
import Checkbox from '@/components/fields/checkbox';
import ButtonSubmit from '@/components/fields/buttons/submit';

import {generateKey} from '@/utils/random';

// async import for the box components
const LayoutColumns = () => import('@/components/layout/columns/columns');
const MultiBox = () => import('@/components/layout/multibox/multiBox');

export default {
	name: 'VirtualComponent',
	components: {
		InputText,
		InputPassword,
		Selector,
		Textarea,
		Checkbox,
		ButtonSubmit,

		LayoutColumns,
		MultiBox,
	},
	props: {
		schemeOptions: {
			type: Object,
			required: true,
		},
		// this field used in multibox, and pass only in props, because use rerendering
		multiboxIndex: {
			type: Number,
			required: false,
			default: -1,
		},
	},

	data() {
		// set unique key for each field
		return {
			key: generateKey(),
		};
	},

	created() {
		if (!this.schemeOptions?.generalParams) {
			throw new Error('virtualComponent.vue: param generalParams is empty');
		}
		if (!this.schemeOptions?.generalParams?.type) {
			throw new Error(
				'virtualComponent.vue: param type in generalParams is empty'
			);
		}
	},
};
</script>
