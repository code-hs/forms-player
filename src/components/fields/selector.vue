<template>
	<div class="input-selector">
		<div v-if="text.hint" class="hint">{{ text.hint }}</div>

		<select
			ref="self"
			v-model="fieldsetModelItem[generalParams.model]"
			required
			:class="{error: valid.error}"
			@change="handleChange"
		>
			<option
				v-if="customParams.values && customParams.values.default"
				value=""
				disabled
			>
				{{ customParams.values.default }}
			</option>

			<option
				v-for="(value, key) in customParams.values.options"
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
import {taskStatuses} from '@/classes/validator/validatorUtils';

export default {
	name: 'Selector',
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
				values: {},
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
				error: false,
				connect: false,
			},
		};
	},

	computed: {
		...mapGetters({
			modelStructure: 'model/structure',
			validatorTaskStatus: 'validator/taskStatus',
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
		async validatorTaskStatus(status) {
			if (status !== taskStatuses.process || !this.valid.connect) {
				return;
			}

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

			if (FieldValidator.canValidation(this.validation)) {
				this.valid.connect = true;
				this.validatorInitField(options);
			}
		},
		handleChange() {
			if (!this.valid.connect) return;

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
