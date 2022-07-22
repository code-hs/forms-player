<template>
	<div :class="'vrc-' + fieldType">
		<component
			:is="schemeOptions.common.type"
			:key="key"
			:virtual-key="key"
			:multibox-index="multiboxIndex"
			v-bind="schemeOptions"
		/>
		<StyleIncluder v-if="isHasStyles()" :styles="schemeOptions.styles.value" />
	</div>
</template>

<script>
import {mapMutations} from 'vuex';
import {VirtualComponentH} from '@/classes/components/main/VirtualComponentH';
import {generateKey} from '@/utils/random';

import InputText from '@/components/fields/inputs/text';
import InputPassword from '@/components/fields/inputs/password';
import InputEmail from '@/components/fields/inputs/email';
import Selector from '@/components/fields/selector';
import Textarea from '@/components/fields/inputs/textarea';
import Checkbox from '@/components/fields/checkbox';
import ButtonSubmit from '@/components/fields/buttons/submit';
import TextContainer from '@/components/content/textContainer';
import StyleIncluder from '@/components/utils/styleIncluder';

// async import for the box components
const LayoutColumns = () => import('@/components/layout/columns/columns');
const MultiBox = () => import('@/components/layout/multibox/multiBox');
const LayoutContainer = () =>
	import('@/components/layout/containers/layoutContainer');

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
		TextContainer,
		StyleIncluder,
		LayoutColumns,
		MultiBox,
		LayoutContainer,
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
			fieldType: this.schemeOptions?.common?.type,
		};
	},

	created() {
		this.checkComponent();
		this.initModel();
	},

	methods: {
		...mapMutations({
			modelInitField: 'model/initField',
		}),
		checkComponent() {
			if (!this.schemeOptions?.common) {
				throw new Error('virtualComponent.vue: param common is empty');
			}
			if (!this.schemeOptions?.common?.type) {
				throw new Error('virtualComponent.vue: param type in common is empty');
			}
		},
		isHasStyles() {
			return !!(this.schemeOptions.styles && this.schemeOptions.styles.value);
		},
		initModel() {
			const allowedComponents = [
				'InputText',
				'InputPassword',
				'InputEmail',
				'Selector',
				'Textarea',
				'Checkbox',
			];
			// noinspection JSCheckFunctionSignatures
			if (
				!VirtualComponentH.canInitModel(
					allowedComponents,
					this.fieldType,
					this.schemeOptions
				)
			) {
				return;
			}

			// init field
			// for generate structure by inputs,
			// and we can use it in <input v-model="modelStore[common.model]"
			const defaultValue = '';
			const options = {
				inputModelName: this.schemeOptions.common.model,
				inputValue: defaultValue,
			};
			this.modelInitField(options);
		},
	},
};
</script>
