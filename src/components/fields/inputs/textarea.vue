<template>
	<div class="input-textarea">
		<div v-if="text.hint" class="hint">{{ text.hint }}</div>

		<textarea
			ref="self"
			v-model="fieldsetModelItem[generalParams.model]"
			:placeholder="text.placeholder"
			:rows="customParams.rows"
			:required="validation.required"
			:class="{error: valid.error}"
			@blur="handleBlur"
			@input="handleInput"
		>
		</textarea>

		<transition name="fade">
			<div v-if="validation.errorText" v-show="valid.error" class="error-text">
				{{ validation.errorText }}
			</div>
		</transition>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {debounce} from '@/utils/debounce';
import {FieldValidator} from '@/classes/validator/FieldValidator';
import {
	TASK_VALIDATION,
	debounceTime,
} from '@/classes/validator/validatorUtils';

export default {
	name: 'InputTextarea',
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
			default: () => ({
				rows: '',
			}),
		},
		validation: {
			type: Object,
			required: false,
			default: () => ({
				required: false,
				pattern: '',
				errorText: '',
			}),
		},
		// inform about fields in this object (in this file)
		text: {
			type: Object,
			required: false,
			default: () => ({
				placeholder: '',
				hint: '',
			}),
		},
	},

	data() {
		return {
			valid: {
				dirty: false,
				error: false,
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
		async validatorTask(taskName) {
			if (taskName !== TASK_VALIDATION) return;

			this.handleBlur();
			// noinspection ES6RedundantAwait
			const setActiveFocus = await this.validatorResponseOnTask(
				this.valid.error
			);

			if (setActiveFocus) this.focus();
		},
	},

	created() {
		this.initField();
		this.processInput = debounce(this.processInput, debounceTime);
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
			this.validatorInitField(options);
		},
		handleBlur() {
			this.processValidationField();

			// if field has error - becomes dirty, otherwise clear
			this.valid.dirty = this.valid.error;
			this.validatorSaveInfo();
		},
		handleInput(e) {
			// update v-model, fix for mobile gboard
			this.fieldsetModelItem[this.generalParams.model] = e.target.value;
			this.processInput();
		},
		processInput() {
			// only for dirty state
			if (!this.valid.dirty) return;

			this.processValidationField();
			this.validatorSaveInfo();
		},
		processValidationField() {
			if (!this.validation) return;

			try {
				this.valid.error = !FieldValidator.isValid(this.validation, this.value);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error(e);
			}
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
		focus() {
			this.$refs.self.focus();
		},
	},
};
</script>
