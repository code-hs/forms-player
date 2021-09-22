<template>
	<div>
		<label> {{ label }} </label>
		<br />
		<input v-model="inputsStructure[vModel]" type="password" />
	</div>
</template>

<script>
export default {
	props: ['inputsStructure', 'vModel', 'label'],
	data() {
		return {
			value: '',
		};
	},
	created() {
		// this.$set(this.form, this.vModel, this.value);
	},
};
</script>
