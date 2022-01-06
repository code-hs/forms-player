<template>
	<div class="input-textarea">
		<textarea
			v-model="fieldsetModelItem[generalParams.model]"
			:placeholder="text.placeholder"
			cols="30"
			rows="10"
			:required="validation.required"
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
		generalParams: {
			type: Object,
			required: true,
		},
		customParams: {
			type: Object,
			required: true,
		},
		text: {
			type: Object,
			required: false,
			default: () => {},
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
			inputModelName: this.generalParams.model,
			inputValue: this.value,
		};
		this.initField(options);
	},

	methods: {
		...mapMutations({initField: 'model/initField'}),
	},
};
</script>
