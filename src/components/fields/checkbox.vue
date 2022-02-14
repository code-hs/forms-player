<template>
	<div class="checkbox">
		<label>
			<input
				ref="self"
				v-model="fieldsetModelItem[generalParams.model]"
				type="checkbox"
				:required="validation.required"
				@change="handleChange"
			/>
			<span
				class="text"
				:class="{error: valid.errorForView}"
				v-html="customParams.bodyHTML"
			/>
		</label>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {TASK_VALIDATION} from '@/classes/validator/validatorUtils';
import {FieldValidator} from '@/classes/validator/FieldValidator';

export default {
	name: 'Checkbox',
	props: {
		groupIndex: {
			type: Number,
			required: true,
		},
		fieldsetIndex: {
			type: Number,
			required: true,
		},
		// below params from v-bind
		generalParams: {
			type: Object,
			required: true,
		},
		customParams: {
			type: Object,
			required: true,
		},
		validation: {
			type: Object,
			required: false,
			default: () => ({
				required: false,
			}),
		},
	},

	data() {
		return {
			valid: {
				error: false,
				errorForView: false,
			},
		};
	},

	computed: {
		...mapGetters({
			modelStructure: 'model/structure',
			validatorTask: 'validator/currentTask',
		}),
		fieldsetModelItem() {
			// current fieldset with inputs values
			return this.modelStructure[this.groupIndex][this.fieldsetIndex];
		},
		value() {
			return this.fieldsetModelItem[this.generalParams.model];
		},
	},

	watch: {
		validatorTask(taskName) {
			if (
				taskName !== TASK_VALIDATION ||
				!FieldValidator.canValidation(this.validation, true)
			) {
				return;
			}

			// after click submit, if empty value -> show error border
			if (!this.value) this.valid.errorForView = true;

			this.handleChange();
			this.validatorResponseOnTask(this.valid.error);
		},
	},

	created() {
		this.initField();
	},

	destroyed() {
		this.validatorDestroyField();
	},

	methods: {
		...mapMutations({
			modelInitField: 'model/initField',
			validatorInitField: 'validator/initField',
			validatorUpdateFieldInfo: 'validator/updateFieldInfo',
			validatorDestroyField: 'validator/destroyField',
		}),
		...mapActions({
			validatorResponseOnTask: 'validator/responseOnTask',
		}),
		initField() {
			// init input
			// for generate structure by inputs (model, validator);
			// and we can use it in <input v-model="fieldsetModelItem[generalParams.model]"
			const defaultValue = '';
			const options = {
				groupIndex: this.groupIndex,
				fieldsetIndex: this.fieldsetIndex,
				inputModelName: this.generalParams.model,
				inputValue: defaultValue,
			};
			this.modelInitField(options);

			if (FieldValidator.canValidation(this.validation, true)) {
				this.validatorInitField(options);
			}
		},
		handleChange() {
			if (!FieldValidator.canValidation(this.validation, true)) return;

			if (this.value) this.valid.errorForView = false;
			this.valid.error = !this.value;

			this.validatorSaveInfo();
		},
		validatorSaveInfo() {
			const information = {
				groupIndex: this.groupIndex,
				fieldsetIndex: this.fieldsetIndex,
				inputModelName: this.generalParams.model,
				error: this.valid.error,
			};
			this.validatorUpdateFieldInfo(information);
		},
	},
};
</script>
