<template>
	<div id="app" class="input-text">
		<label>
			<span class="text"> {{ label }} </span>

			<input v-model="fieldsetModel[vModel]" type="text" />
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
		vModel: {
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
		...mapGetters({inputsStructure: 'inputsModel/structure'}),
		fieldsetModel() {
			// Объект в котором хранятся значения инуптов в текущем fieldset
			// если это поле находиться в дата, происходит баг с ключами,
			// воспроизводится путем нажатия на + и потом удаления первого элемента,
			// а вместо него удаляется последний и не работает binding
			return this.inputsStructure[this.groupIndex][this.fieldsetIndex];
		},
	},
	created() {
		this.$set(this.fieldsetModel, this.vModel, this.value);
	},
};
</script>
