<template>
	<component :is="'style'" v-if="styleStr" type="text/css" v-html="styleStr" />
</template>

<script>
import {StyleIncluder} from '@/libs/utils/style-includer';

export default {
	name: 'StyleIncluder',
	data() {
		return {
			styleStr: new StyleIncluder().toString(),
		};
	},
};
</script>
