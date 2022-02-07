<!--suppress JSUnresolvedVariable -->
<template>
	<div class="checkbox">
		<label>
			<input v-model="fieldsetModelItem[generalParams.model]" type="checkbox" />
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
		// below params from v-bind
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
