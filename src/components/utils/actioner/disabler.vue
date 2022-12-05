<template>
	<div />
</template>

<script>
import {bus, busBroadcasts} from '@/utils/bus';

export default {
	mounted() {
		// noinspection JSUnresolvedFunction
		// bus.$on(busBroadcasts.DISPLAY_CONTAINER, this.process);
	},
	methods: {
		process(action) {},
	},
};
</script>
