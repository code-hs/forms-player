<template>
	<div class="app" :data-layout="dataLayout" :data-theme="dataTheme">
		<template v-if="showContent">
			<FormC />
		</template>

		<StyleIncluder v-if="styles" :styles="styles" />
		<ValidationFocus />

		<div v-if="showDump" class="dump">{{ modelStructure }}</div>
		<!--		<div v-if="showDump" class="dump">{{ validatorFields }}</div>-->
	</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import FormC from '@/components/form';
import {Config} from '@/config/index';
import {Api} from '@/classes/api/Api';
import {generateHash} from '@/utils/random';
import ValidationFocus from '@/components/utils/validation/focus';
import {StylesH} from '@/classes/utils/StylesH';
import StyleIncluder from '@/components/utils/styleIncluder';

export default {
	components: {FormC, ValidationFocus, StyleIncluder},
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
			pageKey: this.getPageKey(),
			showContent: false,
			showDump: Config.showDump,
			appId: generateHash(), // id for the app, for api ddos protection
			styles: '',
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

		const scheme = await this.loadScheme();
		const pageStructure = await this.initPage(this.pageKey);
		if (!pageStructure) {
			throw new Error('app.created: pageStructure is empty');
		}

		this.generateModelSkeleton(pageStructure);
		// after page structure generated, we can inject inputs
		if (pageStructure && this.modelStructure) this.showContent = true;

		this.initPlugins();
		this.initStyles(scheme);
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
		getPageKey() {
			// can use hash url
			// window.location.hash.slice(1)
			// from tag attribute
			return this.dataPage;
		},
		initStyles(scheme) {
			this.styles = StylesH.getStyles(scheme);
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/scss/index';
</style>
