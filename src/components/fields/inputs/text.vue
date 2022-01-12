<template>
	<div class="input-text">
		<input
			v-model="fieldsetModelItem[generalParams.model]"
			type="text"
			:placeholder="text.placeholder"
			:required="validation.required"
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
		return {};
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

		this.handleInput = debounce(this.handleInput, 750);
	},

	methods: {
		...mapMutations({initField: 'model/initField'}),
		handleInput() {
			const value = this.fieldsetModelItem[this.generalParams.model];
			let valid;

			try {
				valid = FieldValidator.isValid(this.validation, value);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.error(e);
				valid = false;
			}

			if (valid) {
				// set field valid
			} else {
				// set field error status
			}
		},
	},
};
</script>
