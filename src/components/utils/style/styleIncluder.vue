<template>
	<component :is="'style'" v-if="styleStr" type="text/css" v-html="styleStr" />
</template>

<script>
import {StyleIncludeHelper} from '@/classes/utils/StyleIncludeHelper';

export default {
	name: 'StyleIncluder',
	data() {
		return {
			styleStr: StyleIncludeHelper.getAllStyles(),
		};
	},
};
</script>
