<template>
	<div class="wdf-burger" @click="toggleMenu"><span /><span /><span /></div>
</template>
<script>
export default {
	created() {
		window.addEventListener('resize', this.windowSizeChecker);
	},
	destroyed() {
		window.removeEventListener('resize', this.windowSizeChecker);
	},
	methods: {
		windowSizeChecker(e) {
			const form = document.querySelector('.wdf-app');
			if (
				(e?.target?.outerWidth > 767 || window.innerWidth > 767) &&
				form.classList.contains('open-menu')
			) {
				form.classList.remove('open-menu');
			}
		},
		toggleMenu() {
			const form = document.querySelector('.wdf-app');
			form.classList.toggle('open-menu');
		},
	},
};
</script>
