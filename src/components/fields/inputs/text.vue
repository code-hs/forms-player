<template>
	<div class="input-text">
		<label>
			<span class="text"> {{ label }} </span>

			<input v-model="fieldsetModelItem[inputModelName]" type="text" />
		</label>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';

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
		// inputModelName - это название поля в схеме
		inputModelName: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			value: '',
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
	},
	created() {
		// как только отобразился текущий элемент, добавляем его реактивно в model/structure
		this.$set(this.fieldsetModelItem, this.inputModelName, this.value);
	},
};
</script>
