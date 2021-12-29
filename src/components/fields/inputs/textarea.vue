<!--suppress HtmlUnknownAttribute -->
<template>
	<div class="input-textarea">
		<textarea
			v-model="fieldsetModelItem[inputModelName]"
			:placeholder="customParams.placeholder"
			cols="30"
			rows="10"
			:required="generalParams.required"
		>
		</textarea>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
	name: 'InputTextarea',
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
