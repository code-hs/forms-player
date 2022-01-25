<template>
	<div class="input-text">
		<div v-if="text.hint" class="hint">{{ text.hint }}</div>

		<input
			ref="input"
			v-model="fieldsetModelItem[generalParams.model]"
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
import {TASK_VALIDATION} from '@/classes/validator/validatorUtils';

export default {
	name: 'InputText',
	props: {
		groupIndex: {
			type: Number,
			required: true,
		},
		fieldsetIndex: {
			type: Number,
			required: true,
		},
		// ниже значения идут от, v-bind
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
		// отображаем какие поля используем в этом объекте в коде
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
			validatorStructure: 'validator/structure',
			validatorTask: 'validator/currentTask',
			validatorHasError: 'validator/hasError',
		}),
		fieldsetModelItem() {
			// Объект в котором хранятся значения инуптов в текущем fieldset
			return this.modelStructure[this.groupIndex][this.fieldsetIndex];
		},
		validatorItem() {
			// Объект в котором хранятся значения инуптов в текущем fieldset
			return this.validatorStructure[this.groupIndex][this.fieldsetIndex];
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
			const setActiveFocus = await this.validatorSetStatus(this.valid.error);
			console.log('setActiveFocus :>> ', setActiveFocus);

			if (setActiveFocus) this.focus();
		},
	},

	async created() {
		// console.log(this.fieldsetIndex);
		const defaultValue = '';
		// Как только отобразился текущий элемент, добавляем его реактивно в model/structure
		// Что бы структура всегда была сгенерирована исходя из всех инпутов.
		// И могла спокойно обрабатываться в <input v-model="fieldsetModelItem[generalParams.model]"
		const options = {
			groupIndex: this.groupIndex,
			fieldsetIndex: this.fieldsetIndex,
			inputModelName: this.generalParams.model,
			inputValue: defaultValue,
		};
		this.initField(options);
		this.validatorInitField(options);

		this.handleInput = debounce(this.handleInput, 300);
	},

	methods: {
		...mapMutations({
			initField: 'model/initField',
			validatorInitField: 'validator/initField',
			validatorUpdateFieldStatus: 'validator/updateFieldStatus',
		}),
		...mapActions({
			validatorSetStatus: 'validator/setValidateStatus',
		}),

		focus() {
			this.$refs.input.focus();
		},
		handleBlur() {
			this.processValidation();

			// поле становиться грязным, если в нем была ошибка
			// или чистым, если нет ошибок
			this.valid.dirty = this.valid.error;
			this.validatorUpdate();
		},
		handleInput() {
			// use function when field dirty
			if (!this.valid.dirty) return;

			this.processValidation();
			this.validatorUpdate();
		},
		validatorUpdate() {
			const options = {
				groupIndex: this.groupIndex,
				fieldsetIndex: this.fieldsetIndex,
				inputModelName: this.generalParams.model,
				error: this.valid.error,
			};
			this.validatorUpdateFieldStatus(options);
		},
		processValidation() {
			if (!this.validation) return;

			try {
				this.valid.error = !FieldValidator.isValid(this.validation, this.value);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error(e);
			}
		},
	},
};
</script>
