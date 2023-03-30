<template>
	<div class="wdf-burger" @click="emitMenuState"><span /><span /><span /></div>
</template>
<script>
export default {
	data() {
		return {
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
			if ((e?.target?.outerWidth > 767 || window.innerWidth > 767) && this.state) {
				this.emitMenuState();
			}
		},
		emitMenuState() {
			this.$emit('emitMenuState', (this.state = !this.state));
		},
	},
};
</script>
