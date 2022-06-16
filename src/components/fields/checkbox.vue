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
				v-html="$t(customParams.bodyHTML)"
			/>
		</label>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {FieldValidator} from '@/classes/validator/FieldValidator.ts';
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper.ts';
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'Checkbox',
	props: {
		generalParams: FH.generalParams,
		validation: FH.validation,
		virtualKey: FH.virtualKey,
		multiboxIndex: FH.multiboxIndex,
		text: FH.text,
		html: FH.html,
		styles: FH.styles,
		customParams: {
			type: Object,
			required: false,
			default: () => ({
				bodyHTML: '',
			}),
		},
	},

	data() {
		return {
			multiBoxName: FH.getMultiName(this),
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
		this.validatorDestroy(this.virtualKey);
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
				this.validatorAdd(this.virtualKey);

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
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
		async validatorHandleTask() {
			// after click submit, if empty value -> show error border
			if (!this.value) {
				this.valid.errorForView = true;
			}

			this.handleChange(false);
			this.fieldResponseOnValidationEvent({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
	},
};
</script>
