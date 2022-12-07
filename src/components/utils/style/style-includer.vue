<template>
	<component :is="'style'" v-if="styleStr" type="text/css" v-html="styleStr" />
</template>

<script>
import {StyleIncludeL} from '@/libs/utils/StyleIncludeL';

export default {
	name: 'StyleIncluder',
	data() {
		return {
			styleStr: StyleIncludeL.getAllStylesAsStr(),
		};
	},
};
</script>
