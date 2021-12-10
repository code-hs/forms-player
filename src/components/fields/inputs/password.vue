<template>
	<div>
		<label> {{ label }} </label>
		<br />
		<input v-model="modelStructure[vModel]" type="password" />
	</div>
</template>

<script>
export default {
	props: ['modelStructure', 'vModel', 'label'],
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
