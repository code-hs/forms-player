<template>
	<component
		:is="'style'"
		v-if="styles"
		type="text/css"
		v-html="styles"
	></component>
</template>

<script>
export default {
	name: 'StyleIncluder',
	props: {
		styles: {
			type: String,
			required: true,
		},
	},
};
</script>
