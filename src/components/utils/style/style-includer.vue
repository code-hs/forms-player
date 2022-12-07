<template>
	<component :is="'style'" v-if="styleStr" type="text/css" v-html="styleStr" />
</template>

<script>
import {StyleIncluderL} from '@/libs/utils/style-includer';

export default {
	name: 'StyleIncluder',
	data() {
		return {
			styleStr: StyleIncluderL.getAllStylesAsStr(),
		};
	},
};
</script>
