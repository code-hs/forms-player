<template>
	<div class="app" :data-layout="dataLayout" :data-theme="dataTheme">
		<span>{{ $t('lead') }}</span>
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
import {generateHash} from '@/utils/random';

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
		// current language
		dataLanguage: {
			type: String,
			default: 'en',
		},
	},

	data() {
		return {
			pageName: this.getPageName(),
			showContent: false,
			showDump: Config.showDump,
			appId: generateHash(),
		};
	},

	computed: {
		...mapGetters({
			modelStructure: 'model/structure',
			validatorFields: 'validator/fields',
		}),
	},

	watch: {
		dataLanguage(newValue) {
			this.i18n.changeLanguage(newValue);
		},
	},

	async created() {
		if (!this.dataPage || !this.dataProjectId) {
			throw new Error('app: created: bad params');
		}

		this.loadScheme();
		const pageStructure = await this.initPage(this.pageName);

		if (!pageStructure) {
			throw new Error('app: created: bad pageStructure');
		}

		this.generateModelSkeleton(pageStructure);

		// after page structure generated, we can inject inputs
		if (pageStructure && this.modelStructure) this.showContent = true;

		Api.install(this.dataProjectId, this.appId);
	},

	methods: {
		...mapMutations({
			generateModelSkeleton: 'model/generateSkeleton',
		}),
		...mapActions({
			loadScheme: 'scheme/load',
			initPage: 'scheme/initPage',
		}),
		getPageName() {
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
