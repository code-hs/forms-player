<template>
	<div class="field checkbox">
		<label>
			<input
				ref="self"
				v-model="modelStore[generalParams.model]"
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
import {FieldValidator} from '@/classes/validator/FieldValidator';
import {FieldHelper} from '@/classes/field/FieldHelper';
import {FieldPropser} from '@/classes/field/FieldPropser';
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'Checkbox',
	props: {
		multiboxIndex: FieldPropser.multiboxIndex(),
		itemKey: FieldPropser.itemKey(),
		generalParams: FieldPropser.generalParams(),
		// below params from v-bind
		customParams: {
			type: Object,
			required: false,
			default: () => ({
				bodyHTML: '',
			}),
		},
		validation: {
			type: Object,
			required: false,
			default: () => ({
				required: false,
			}),
		},
		text: {
			type: Object,
			required: false,
			default: () => ({}),
		},
	},

	data() {
		return {
			valid: {
				error: false,
				errorForView: false,
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
	},

	beforeDestroy() {
		this.validatorDestroy(this.itemKey);
		// noinspection JSUnresolvedFunction
		bus.$off(busBroadcasts.VALIDATION_START, this.validatorHandleTask);
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
			if (FieldValidator.canValidation(this.validation, true)) {
				this.valid.connect = true;
				this.validatorAdd(this.itemKey);

				// noinspection JSUnresolvedFunction
				bus.$on(busBroadcasts.VALIDATION_START, this.validatorHandleTask);
			}
		},
		handleChange() {
			if (!this.valid.connect) return;

			if (this.value) this.valid.errorForView = false;
			this.valid.error = !this.value;

			this.validatorSaveInfo();
		},
		validatorSaveInfo() {
			this.validatorUpdate({
				key: this.itemKey,
				error: this.valid.error,
			});
		},
		async validatorHandleTask() {
			// after click submit, if empty value -> show error border
			if (!this.value) {
				this.valid.errorForView = true;
			}

			this.handleChange(false);
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
