<template>
	<div v-if="isEnable" class="wdf-burger" @click="emitMenuState"><span /><span /><span /></div>
</template>
<script>
import {Burger} from '@/libs/components/burger/burger';
import {Consts} from '@/config/consts';

export default {
	data() {
		const isEnable = new Burger().isEnable();
		return {
			isEnable,
			state: false,
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
				(e?.target?.outerWidth > Consts.mobilePoint || window.innerWidth > Consts.mobilePoint) &&
				this.state
			) {
				this.emitMenuState();
			}
		},
		emitMenuState() {
			this.$emit('emitMenuState', (this.state = !this.state));
		},
	},
};
</script>
