<template>
	<div class="form-s">
		<div v-if="showContent" class="page-container">
			<Page />
		</div>

		<div v-if="showDump" class="dump">
			{{ inputsStructure }}
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import Page from '@/components/Page';
import config from '@/config/index';

export default {
	components: {Page},
	data() {
		return {
			urlHash: window.location.hash.slice(1),
			showContent: false,
			showDump: config.showDump,
		};
	},
	computed: {
		...mapGetters({
			inputsStructure: 'inputsModel/structure',
		}),
	},
	async created() {
		this.initScheme();
		const currentPage = await this.initPage(this.urlHash);
		this.generateInputsStructure(currentPage);

		// after all data loaded and valid
		if (currentPage && this.inputsStructure) this.showContent = true;
	},
	methods: {
		...mapMutations({
			generateInputsStructure: 'inputsModel/generateStructure',
		}),
		...mapActions({
			initScheme: 'form/init',
			initPage: 'form/initPage',
		}),
	},
};
</script>

<style lang="scss">
@import '@/assets/css/index';
</style>
