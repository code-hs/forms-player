<template>
	<div class="app" :data-layout="dataLayout" :data-theme="dataTheme">
		<div v-if="showContent" class="page-container grid-container">
			<Page />
		</div>

		<div v-if="showDump" class="dump">{{ modelStructure }}</div>
		<!--		<div v-if="showDump" class="dump">{{ validatorFields }}</div>-->
	</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import Page from '@/components/page';
import {Config} from '@/config/index';
import {Api} from '@/classes/api/Api';

export default {
	components: {Page},
	props: {
		// customer project id
		dataProjectId: {
			type: String,
			default: '',
			required: true,
		},
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
			required: true,
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
			validatorFields: 'validator/fields',
		}),
	},

	async created() {
		if (!this.dataPage || !this.dataProjectId) {
			throw new Error('app: created: bad params');
		}

		this.loadScheme();
		const currentPage = await this.initPage(this.urlHash);
		if (!currentPage) {
			throw new Error('app: created: bad currentPage');
		}

		this.generateModelSkeleton(currentPage);

		// after structure generated, we can inject inputs
		if (currentPage && this.modelStructure) this.showContent = true;

		Api.install(this.dataProjectId);
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
