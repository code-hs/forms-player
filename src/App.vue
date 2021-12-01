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
import {mapActions, mapGetters} from 'vuex';
import Page from '@/components/Page';
import config from './config/index';

export default {
	components: {Page},
	data() {
		return {
			urlHash: window.location.hash.slice(1),
			showContent: false,
		};
	},
	computed: {
		...mapGetters({
			currentPage: 'form/page',
			inputsStructure: 'inputsModel/structure',
		}),
		showDump() {
			return config.showDump;
		},
	},
	async created() {
		await this.initScheme();
		await this.initPage(this.urlHash);
		await this.generateInputsStructure(this.currentPage);

		// after all data loaded and valid
		if (this.currentPage && this.inputsStructure) this.showContent = true;
	},
	methods: {
		...mapActions({
			initScheme: 'form/init',
			initPage: 'form/initPage',
			generateInputsStructure: 'inputsModel/generateStructure',
		}),
	},
};
</script>

<style lang="scss">
@import '~@/assets/css/index';
</style>
