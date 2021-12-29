<template>
	<div class="app" :data-layout="dataLayout">
		<div v-if="showContent" class="page-container grid-container">
			<Page />
		</div>

		<div v-if="showDump" class="dump">{{ modelStructure }}</div>
	</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import Page from '@/components/page';
import config from '@/config/index';

export default {
	components: {Page},
	props: {
		// Необходим для grid system, что бы правильно обрабатывать для малого расширения формы
		dataLayout: {
			type: String,
			default: 'large',
		},
		dataPage: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			urlHash: this.getPageHash(),
			showContent: false,
			showDump: config.showDump,
		};
	},

	computed: {
		...mapGetters({
			modelStructure: 'model/structure',
		}),
	},

	async created() {
		this.loadScheme();
		const currentPage = await this.initPage(this.urlHash);
		this.generateModelStructure(currentPage);

		// after all data loaded and valid
		if (currentPage && this.modelStructure) this.showContent = true;
	},

	methods: {
		...mapMutations({
			generateModelStructure: 'model/generateStructure',
		}),
		...mapActions({
			loadScheme: 'scheme/load',
			initPage: 'scheme/initPage',
		}),
		getPageHash() {
			// can use hash url
			// window.location.hash.slice(1)

			// from tag attribute
			return this.dataPage;
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/css/index';
</style>
