<template>
	<div v-if="isEnable" class="wdf-burger" @click="emitMenuState"><span /><span /><span /></div>
</template>
<script>
import {Burger} from '@/libs/components/burger/burger';
import {Consts} from '@/config/consts';

export default {
	data() {
		return {
			isEnable: new Burger().isEnable(),
			show: false,
		};
	},
	created() {
		window.addEventListener('resize', this.windowSizeChecker);
	},
	destroyed() {
		window.removeEventListener('resize', this.windowSizeChecker);
	},
	methods: {
		windowSizeChecker(e) {
			if (
				this.show &&
				(e?.target?.outerWidth > Consts.mobilePoint || window.innerWidth > Consts.mobilePoint)
			) {
				// hide menu
				this.emitMenuState();
			}
		},
		emitMenuState() {
			this.show = !this.show;
			this.$emit('emitMenuState', this.show);
		},
	},
};
</script>
