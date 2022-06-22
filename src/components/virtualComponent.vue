<template>
	<component
		:is="schemeOptions.generalParams.type"
		:key="key"
		:virtual-key="key"
		:multibox-index="multiboxIndex"
		v-bind="schemeOptions"
	/>
</template>

<script>
import {mapMutations} from 'vuex';

import InputText from '@/components/fields/inputs/text';
import InputPassword from '@/components/fields/inputs/password';
import InputEmail from '@/components/fields/inputs/email';

import Selector from '@/components/fields/selector';
import Textarea from '@/components/fields/inputs/textarea';
import Checkbox from '@/components/fields/checkbox';
import ButtonSubmit from '@/components/fields/buttons/submit';

import {FieldHelper as FH} from '@/classes/components/field/FieldHelper.ts';
import {generateKey} from '@/utils/random';

// async import for the box components
const LayoutColumns = () => import('@/components/layout/columns/columns');
const MultiBox = () => import('@/components/layout/multibox/multiBox');

export default {
	name: 'VirtualComponent',
	components: {
		InputText,
		InputPassword,
		InputEmail,

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

		this.initModel();
	},

	methods: {
		...mapMutations({
			modelInitField: 'model/initField',
		}),
		initModel() {
			const fieldType = this.schemeOptions?.generalParams?.type;
			const allowedTypes = [
				'InputText',
				'InputPassword',
				'InputEmail',
				'Selector',
				'Textarea',
				'Checkbox',
			];
			if (!allowedTypes.includes(fieldType)) return;

			const multiBoxName = FH.getMultiName(this.schemeOptions);
			// skip initialize, fix bug, when add new group of fields,
			// all groups rerender, and reinit, and clear values
			if (multiBoxName) return;

			// init field
			// for generate structure by inputs,
			// and we can use it in <input v-model="modelStore[generalParams.model]"
			const defaultValue = '';
			const options = {
				inputModelName: this.schemeOptions.generalParams.model,
				inputValue: defaultValue,
			};
			this.modelInitField(options);
		},
	},
};
</script>
