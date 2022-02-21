<template>
	<div class="app" :data-layout="dataLayout" :data-theme="dataTheme">
		<div v-if="showContent" class="page-container grid-container">
			<Page />
		</div>

		<!--		<div v-if="showDump" class="dump">{{ modelStructure }}</div>-->
		<div v-if="showDump" class="dump">{{ validatorStack }}</div>
	</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import Page from '@/components/page';
import {Config} from '@/config/index';

export default {
	components: {Page},
	props: {
		// Needed by the grid system to properly handle a small form resolution
		dataLayout: {
			type: String,
			default: 'large', // | small
		},
		dataTheme: {
			type: String,
			default: 'dark', // | light
		},
		// current opened page
		dataPage: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			urlHash: this.getPageHash(),
			showContent: false,
			showDump: Config.showDump,
		};
	},

	computed: {
		...mapGetters({
			modelStructure: 'model/structure',
			validatorStack: 'validator/stack',
		}),
	},

	async created() {
		this.loadScheme();
		const currentPage = await this.initPage(this.urlHash);
		if (!currentPage) {
			throw new Error('app: created: bad currentPage');
		}

		this.generateModelSkeleton(currentPage);

		// after structure generated, we can inject inputs
		if (currentPage && this.modelStructure) this.showContent = true;
	},

	methods: {
		...mapMutations({
			generateModelSkeleton: 'model/generateSkeleton',
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
@import '@/assets/scss/index';
</style>
