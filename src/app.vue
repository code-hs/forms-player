<template>
	<div class="app" :data-layout="dataLayout" :data-theme="dataTheme">
		<span>{{ $t('app-title') }}</span>
		<template v-if="showContent">
			<Page />
		</template>

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
		// project id
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
			required: true,
		},
		// current language
		dataLanguage: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			pageName: this.getPageName(),
			showContent: false,
			showDump: Config.showDump,
			appId: generateHash(), // id for the app, for api ddos protection
		};
	},

	computed: {
		...mapGetters({
			modelStructure: 'model/structure',
			validatorFields: 'validator/fields',
		}),
	},

	watch: {
		dataLanguage(newLang) {
			this.localization.changeLanguage(newLang);
		},
	},

	async created() {
		if (!this.dataPage) {
			throw new Error('app.created: attr data-page is empty');
		}

		this.loadScheme();

		const pageStructure = await this.initPage(this.pageName);
		if (!pageStructure) {
			throw new Error('app.created: pageStructure is empty');
		}

		this.generateModelSkeleton(pageStructure);
		// after page structure generated, we can inject inputs
		if (pageStructure && this.modelStructure) this.showContent = true;

		this.initPlugins();
	},

	methods: {
		...mapMutations({
			generateModelSkeleton: 'model/generateSkeleton',
		}),
		...mapActions({
			loadScheme: 'scheme/load',
			initPage: 'scheme/initPage',
		}),
		initPlugins() {
			Api.init(this.dataProjectId, this.appId);
			this.localization.init(this.dataLanguage);
		},
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
