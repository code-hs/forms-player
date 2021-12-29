<!--suppress JSUnresolvedVariable -->
<template>
	<div class="checkbox">
		<label>
			<input v-model="fieldsetModelItem[inputModelName]" type="checkbox" />
			<span class="text" v-html="customParams.bodyHTML" />
		</label>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
	name: 'Checkbox',
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
		generalParams: {
			type: Object,
			required: true,
		},
		customParams: {
			type: Object,
			required: true,
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
			return this.modelStructure[this.groupIndex][this.fieldsetIndex];
		},
	},

	created() {
		const options = {
			groupIndex: this.groupIndex,
			fieldsetIndex: this.fieldsetIndex,
			inputModelName: this.inputModelName,
			inputValue: this.value,
		};
		this.initField(options);
	},

	methods: {
		...mapMutations({initField: 'model/initField'}),
	},
};
</script>
