<template>
	<div class="field-item" :class="getFieldClasses()">
		<component
			:is="fieldParams.generalParams.component"
			:multibox-index="multiboxIndex"
			:fieldset-index="fieldsetIndex"
			v-bind="fieldParams"
		/>
	</div>
</template>

<script>
import InputText from '@/components/fields/inputs/text';
import InputPassword from '@/components/fields/inputs/password';
import Selector from '@/components/fields/selector';
import Textarea from '@/components/fields/inputs/textarea';
import Checkbox from '@/components/fields/checkbox';
import ButtonSubmit from '@/components/fields/buttons/submit';

export default {
	name: 'Field',
	components: {
		InputText,
		Selector,
		Textarea,
		Checkbox,
		ButtonSubmit,
		InputPassword,
	},

	props: {
		multiboxIndex: {
			type: Number,
			required: false,
			default: -1,
		},
		fieldsetIndex: {
			type: Number,
			required: true,
		},
		// field params from scheme
		fieldParams: {
			type: Object,
			required: true,
		},
	},

	created() {
		if (!this.fieldParams.generalParams) {
			throw new Error(
				`Field.vue.created: param generalParams is empty. [in groupIndex: ${this.groupIndex}, fieldsetIndex: ${this.fieldsetIndex}]`
			);
		}
		if (!this.fieldParams.generalParams.component) {
			throw new Error(
				`Field.vue.created: param component in generalParams is empty [in groupIndex: ${this.groupIndex}, fieldsetIndex: ${this.fieldsetIndex}]`
			);
		}
	},

	methods: {
		getFieldClasses() {
			// for grid system
			let classes = '';

			// col-6, col-12,...
			if (this.fieldParams.styles?.col) {
				classes += `col-${this.fieldParams.styles.col}`;
			} else {
				// col size default value
				classes += 'col-12';
			}

			return classes;
		},
	},
};
</script>
