<template>
	<div class="field input-selector">
		<div v-if="text.hint" class="hint">{{ text.hint }}</div>

		<select
			ref="self"
			v-model="modelStore[generalParams.model]"
			required
			:class="{error: valid.error}"
			@change="handleChange"
		>
			<option v-if="customParams.defaultText" value="" disabled>
				{{ customParams.defaultText }}
			</option>

			<option
				v-for="(value, key) in customParams.options"
				:key="key"
				:value="key"
			>
				{{ value }}
			</option>
		</select>

		<transition name="fade">
			<div v-if="validation.errorText" v-show="valid.error" class="error-text">
				{{ validation.errorText }}
			</div>
		</transition>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {FieldValidator} from '@/classes/validator/FieldValidator';
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper';
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	name: 'Selector',
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
				options: {},
				defaultText: '',
			}),
		},
	},

	data() {
		return {
			multiBoxName: FH.getMultiName(this),
			valid: {
				error: false,
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
			if (FieldValidator.canValidation(this.validation)) {
				this.valid.connect = true;
				this.validatorAdd(this.virtualKey);

				// noinspection JSUnresolvedFunction
				bus.$on(busBroadcasts.VALIDATION_START, this.validatorHandleTask);
			}
		},
		handleChange() {
			this.validatorProcess(true);
		},
		validatorProcess(updateStore = true) {
			if (!this.valid.connect) return;

			this.validatorUpdateError();
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
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
		async validatorHandleTask() {
			this.validatorProcess(false);
			this.fieldResponseOnValidationEvent({
				key: this.virtualKey,
				error: this.valid.error,
			});
		},
	},
};
</script>
