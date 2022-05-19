<template>
	<div class="field input-text">
		<div v-if="text.hint" class="hint">{{ text.hint }}</div>

		<input
			ref="self"
			v-model="modelStore[generalParams.model]"
			type="text"
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
	name: 'InputText',
	props: {
		// below params from v-bind
		generalParams: {
			type: Object,
			required: true,
		},
		customParams: {
			type: Object,
			required: false,
			default: () => ({}),
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
		multiboxIndex: {
			type: Number,
			required: false,
			default: -1,
		},
		itemKey: {
			type: Number,
			required: true,
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
		multiBoxName() {
			return this.customParams?.multi?.name || '';
		},
		modelStore() {
			if (this.multiBoxName) {
				// if multibox is parent of this field, use multibox name and index
				return this.modelStructure[this.multiBoxName][this.multiboxIndex];
			}
			return this.modelStructure;
		},
		value() {
			return this.modelStore[this.generalParams.model];
		},
	},

	created() {
		this.initModel();
		this.initValidation();

		this.processInput = debounce(
			this.processInput,
			FieldValidator.debounceTime
		);
	},

	beforeDestroy() {
		this.validatorDestroy(this.itemKey);
		// noinspection JSUnresolvedFunction
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
			fieldResponseOnValidationEvent: 'validator/fieldResponse',
		}),

		initModel() {
			// skip initialize, fix bug, when add new group of fields,
			// all groups rerender, and reinit, and clear values
			if (this.multiBoxName) return;

			// init field
			// for generate structure by inputs,
			// and we can use it in <input v-model="modelStore[generalParams.model]"
			const defaultValue = '';
			const options = {
				inputModelName: this.generalParams.model,
				inputValue: defaultValue,
			};
			this.modelInitField(options);
		},
		initValidation() {
			if (FieldValidator.canValidation(this.validation)) {
				this.valid.connect = true;
				this.validatorAdd(this.itemKey);

				// noinspection JSUnresolvedFunction
				bus.$on('VALIDATION:start', this.validatorHandleTask);
			}
		},
		handleBlur() {
			this.validatorProcessAndUpdateDirty();
		},
		handleInput(e) {
			// update v-model, fix for mobile gboard
			this.modelStore[this.generalParams.model] = e.target.value;
			this.validatorProcessDirty();
		},
		validatorProcessDirty() {
			if (!this.valid.connect) return;

			// only for dirty state
			if (!this.valid.dirty) return;

			this.validatorUpdateError();
			this.validatorSaveInfo();
		},
		validatorProcessAndUpdateDirty(updateStore = true) {
			if (!this.valid.connect) return;

			this.validatorUpdateError();
			// if field has error - becomes dirty, otherwise clear
			this.valid.dirty = this.valid.error;

			if (updateStore) this.validatorSaveInfo();
		},
		validatorUpdateError() {
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
		async validatorHandleTask() {
			this.validatorProcessAndUpdateDirty(false);
			// noinspection ES6RedundantAwait
			const setActiveFocus = await this.fieldResponseOnValidationEvent({
				key: this.itemKey,
				error: this.valid.error,
			});

			if (setActiveFocus) FieldHelper.scrollAndFocusElement(this.$refs.self);
		},
	},
};
</script>
