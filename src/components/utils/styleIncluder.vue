<template>
	<component :is="'style'" v-if="styleStr" type="text/css" v-html="styleStr" />
</template>

<script>
export default {
	name: 'StyleIncluder',
	props: {
		styles: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			styleStr: '',
		};
	},

	created() {
		// this.styleStr = this.styles.value || '';
		//
		// if (this.styles.values) {
		// 	const styles = this.styles.values.join(' ');
		// 	this.styleStr += ` ${styles}`;
		// }
	},
};
</script>
