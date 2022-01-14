<template>
	<div class="input-text">
		<input
			v-model="fieldsetModelItem[generalParams.model]"
			type="text"
			:placeholder="text.placeholder"
			:required="required"
			:class="{error: !valid.isValid}"
			@blur="handleBlur"
			@input="handleInput"
		/>
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
			default: () => {},
		},
		text: {
			type: Object,
			required: false,
			default: () => {},
		},
	},

	data() {
		return {
			valid: {
				dirty: false,
				isValid: true,
			},
		};
	},

	computed: {
		...mapGetters({modelStructure: 'model/structure'}),
		fieldsetModelItem() {
			// Объект в котором хранятся значения инуптов в текущем fieldset
			// если это поле находиться в date, происходит баг с ключами,
			// воспроизводится путем нажатия на + и потом удаления первого элемента,
			// а вместо него удаляется последний и не работает binding
			return this.modelStructure[this.groupIndex][this.fieldsetIndex];
		},
		value() {
			return this.fieldsetModelItem[this.generalParams.model];
		},
		required() {
			if (!this.validation) return false;

			return this.validation.required;
		},
	},

	created() {
		const defaultValue = '';
		// Как только отобразился текущий элемент, добавляем его реактивно в model/structure
		// Что бы структура всегда была подготовлена исходя из всех инпутов.
		// И могла спокойно обрабатываться в <input v-model="fieldsetModelItem[this.generalParams.model]"
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
			const isValid = this.processValidation();

			if (isValid) this.valid.dirty = false;
		},
		handleInput() {
			// use function when dirty === true
			if (!this.valid.dirty) return;

			this.processValidation();
		},
		processValidation() {
			if (!this.validation || !Object.keys(this.validation).length) {
				return false;
			}

			let isValid;

			try {
				isValid = FieldValidator.isValid(this.validation, this.value);
				this.updateValidOptions(isValid);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error(e);
			}

			return isValid;
		},
		updateValidOptions(isValid) {
			this.valid.isValid = isValid;

			if (!isValid) {
				this.valid.dirty = true;
			}
		},
	},
};
</script>
