<template>
	<div class="frm__gnrtr-input-text">
		<label>
			<span class="frm__gnrtr-text"> {{ label }} </span>

			<input v-model="fieldsetModel[vModel]" type="text" />
		</label>
	</div>
</template>

<script>
export default {
	props: {
		inputsStructure: {
			// global input values store
			type: Array,
			required: true,
		},
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
		fieldsetModel() {
			// Объект в котором хранятся значения инуптов в текущем fieldset
			// если это поле находиться в дата, происходит баг с ключами,
			// воспроизводится путем нажатия на + и потом удаления первого элемента, а вместо него удаляется последний и не работает binding
			return this.inputsStructure[this.groupIndex][this.fieldsetIndex];
		},
	},
	created() {
		this.$set(this.fieldsetModel, this.vModel, this.value);
	},
};
</script>

<style scoped lang="scss">
@import '../../../assets/styles/fields/index';
</style>
