<template>
	<div class="input-text">
		<div v-if="text.hint" class="hint">{{ text.hint }}</div>

		<input
			ref="self"
			v-model="fieldsetModelItem[generalParams.model]"
			type="password"
			:placeholder="text.placeholder"
			:required="validation.required"
			:class="{error: valid.error}"
			@blur="handleBlur"
			@input="handleInput"
		/>

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
import {FieldHelper} from '@/classes/field/FieldHelper';
import {bus} from '@/utils/bus';

export default {
	name: 'InputPassword',
	props: {
		groupIndex: {
			type: Number,
			required: true,
		},
		fieldsetIndex: {
			type: Number,
			required: true,
		},
		itemKey: {
			type: Number,
			required: true,
		},
		// below params from v-bind
		generalParams: {
			type: Object,
			required: true,
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
				connect: false,
			},
		};
	},

	computed: {
		...mapGetters({
			modelStructure: 'model/structure',
		}),
		fieldsetModelItem() {
			// current fieldset with inputs values
			return this.modelStructure[this.groupIndex][this.fieldsetIndex];
		},
		value() {
			return this.fieldsetModelItem[this.generalParams.model];
		},
	},

	created() {
		this.initField();
		this.processInput = debounce(
			this.processInput,
			FieldValidator.debounceTime
		);
	},

	beforeDestroy() {
		this.validatorDestroy(this.itemKey);
		bus.$off('VALIDATION:start', this.validatorTaskValidate);
	},

	methods: {
		...mapMutations({
			modelInitField: 'model/initField',
			validatorAdd: 'validator/add',
			validatorUpdate: 'validator/update',
			validatorDestroy: 'validator/destroy',
		}),
		...mapActions({
			validatorFieldResponse: 'validator/fieldResponse',
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

			if (FieldValidator.canValidation(this.validation)) {
				this.valid.connect = true;
				this.validatorAdd(this.itemKey);

				bus.$on('VALIDATION:start', this.validatorTaskValidate);
			}
		},
		handleBlur() {
			if (!this.valid.connect) return;

			this.processValidationField();

			// if field has error - becomes dirty, otherwise clear
			this.valid.dirty = this.valid.error;
			this.validatorSaveInfo();
		},
		handleInput(e) {
			if (!this.valid.connect) return;

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
			try {
				this.valid.error = !FieldValidator.isValid(this.validation, this.value);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error(e);
			}
		},
		validatorSaveInfo() {
			this.validatorUpdate({
				key: this.itemKey,
				error: this.valid.error,
			});
		},
		async validatorTaskValidate() {
			this.handleBlur();
			// noinspection ES6RedundantAwait
			const setActiveFocus = await this.validatorFieldResponse({
				key: this.itemKey,
				error: this.valid.error,
			});

			if (setActiveFocus) FieldHelper.scrollAndFocusElement(this.$refs.self);
		},
	},
};
</script>
