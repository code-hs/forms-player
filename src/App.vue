<template>
	<div class="form-s">
		<div v-if="currentPage && inputsStructure" class="page-container">
			<Page :page="currentPage" :inputs-structure="inputsStructure" />
		</div>

		<div class="dump">
			{{ inputsStructure }}
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex';
import Page from '@/components/Page';

export default {
	components: {Page},
	data() {
		return {
			urlHash: window.location.hash.slice(1),
			currentPage: null,
			inputsStructure: null,
		};
	},
	async created() {
		await this.schemeInit();
		this.currentPage = await this.getPage(this.urlHash);
		this.inputsStructure = await this.generateInputStructure();
	},
	methods: {
		...mapActions({
			schemeInit: 'Form/init',
			getPage: 'Form/getPage',
			generateInputStructure: 'Form/generateInputStructure',
		}),
	},
};
</script>

<style lang="scss">
@import '~@/assets/css/index';
</style>
