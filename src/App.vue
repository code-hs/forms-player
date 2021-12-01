<template>
	<div class="form-s">
		<div v-if="currentPage" class="page-container">
			<Page :page="currentPage" />
		</div>

		<div v-if="showDump" class="dump">
			{{ inputsStructure }}
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex';
import Page from '@/components/Page';
import config from './config/index';

export default {
	components: {Page},
	data() {
		return {
			urlHash: window.location.hash.slice(1),
			currentPage: null,
			showContent: false,
		};
	},
	computed: {
		showDump() {
			return config.showDump;
		},
	},
	async created() {
		await this.schemeInit();
		this.currentPage = await this.getPage(this.urlHash);
		this.generateInputsStructure();
	},
	methods: {
		...mapActions({
			schemeInit: 'Form/init',
			getPage: 'Form/getPage',
			generateInputsStructure: 'Form/generateInputsStructure',
		}),
	},
};
</script>

<style lang="scss">
@import '~@/assets/css/index';
</style>
