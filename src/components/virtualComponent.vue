<template>
	<div>
		{{ componentData.generalParams.model }}
		<component
			:is="componentData.generalParams.component"
			v-bind="componentData"
		/>
	</div>
</template>

<script>
import InputText from '@/components/fields/inputs/text';

export default {
	name: 'VirtualComponent',
	components: {
		InputText,
	},
	props: {
		componentData: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {};
	},
	created() {
		console.sh(this.componentData);
	},
};
</script>
