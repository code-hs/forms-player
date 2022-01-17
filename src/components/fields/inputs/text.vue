<template>
	<div class="input-text">
		<div v-if="text.hint" class="hint">{{ text.hint }}</div>

		<input
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
import {mapGetters, mapMutations} from 'vuex';
import {debounce} from '@/utils/debounce';
import {FieldValidator} from '@/classes/FieldValidator';

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
		...mapGetters({modelStructure: 'model/structure'}),
		fieldsetModelItem() {
			// Объект в котором хранятся значения инуптов в текущем fieldset
			return this.modelStructure[this.groupIndex][this.fieldsetIndex];
		},
		value() {
			return this.fieldsetModelItem[this.generalParams.model];
		},
	},

	created() {
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

		this.handleInput = debounce(this.handleInput, 300);
	},

	methods: {
		...mapMutations({initField: 'model/initField'}),
		handleBlur() {
			this.processValidation();

			// поле становиться грязным, если в нем была ошибка
			// или чистым, если нет ошибок
			this.valid.dirty = this.valid.error;
		},
		handleInput() {
			// use function when field dirty
			if (!this.valid.dirty) return;

			this.processValidation();
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
