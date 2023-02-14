<template>
	<div class="app" :data-layout="dataLayout" :data-theme="dataTheme">
		<template v-if="showContent">
			<FormC />

			<StyleIncluder />
			<ValidationFocus />
			<Actioner />

			<div v-if="showDump" class="dump">{{ modelStructure }}</div>
			<!--		<div v-if="showDump" class="dump">{{ validatorFields }}</div>-->
		</template>
	</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import FormC from '@/components/form';
import {Config} from '@/config';
import {Api} from '@/libs/api/api';
import {generateHash} from '@/utils/random';
import ValidationFocus from '@/components/utils/validation/focus';
import StyleIncluder from '@/components/utils/style/style-includer';
import Actioner from '@/components/utils/actioner';
import {SchemeController} from '@/libs/scheme/scheme-controller';

export default {
	components: {FormC, ValidationFocus, StyleIncluder, Actioner},
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
			scheme: null,
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
		dataPage(newPage) {
			this.showContent = false;
			this.pageKey = newPage;
			this.initPage(newPage);
		},
	},

	created() {
		if (!this.dataPage) {
			throw new Error('app.created: attr data-page is empty');
		}

		this.scheme = SchemeController.load();
		this.initPage();
		this.initPlugins();
	},

	methods: {
		...mapMutations({
			generateModelSkeleton: 'model/generateSkeleton',
		}),
		...mapActions({
			sInitPage: 'scheme/initPage',
		}),
		initPlugins() {
			Api.init(this.dataProjectId, this.appId);
			this.localization.init(this.dataLanguage);
		},
		async initPage() {
			const pageStructure = await this.sInitPage(this.pageKey);
			if (!pageStructure) {
				throw new Error('app.created: pageStructure is empty');
			}

			this.generateModelSkeleton(pageStructure);
			// after page structure generated, we can inject inputs
			// each input will be run init and create self field in modelStructure.
			// need to wait for modelStructure to be generated.
			// if, don't wait, modelStructure will be updated (mean = {}, new reference to object)
			// that was after initialized fields
			if (pageStructure && this.modelStructure) this.showContent = true;
		},
		getPageKey() {
			const urlHash = window.location.hash.slice(1);
			if (urlHash) return urlHash;

			return this.dataPage;
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/styles/index';
</style>
