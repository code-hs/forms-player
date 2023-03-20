<template>
	<div class="wdf-app" :data-layout="dataLayout" :data-theme="dataTheme">
		<PageMenu v-if="enabledMenu" :module-menu="moduleMenu.pages" @changePage="changePageHandler" />
		<div v-if="showContent" class="form-wrapper">
			<FormC />

			<StyleIncluder />
			<ValidationFocus />
			<Actioner />

			<div v-if="showDump" class="dump">{{ modelStructure }}</div>
			<!--		<div v-if="showDump" class="dump">{{ validatorFields }}</div>-->
		</div>
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
import PageMenu from '@/components/layout/page-menu';
import {SchemeController} from '@/libs/scheme/scheme-controller';
import {ModuleController} from '@/libs/modules/module-controller';

export default {
	components: {FormC, ValidationFocus, StyleIncluder, Actioner, PageMenu},
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
			menuItem: '',
			pageKey: this.getPageKey(),
			showContent: false,
			showDump: Config.showDump,
			appId: generateHash(), // id for the app, for api ddos protection
			scheme: null,
			moduleMenu: ModuleController.getModuleConfig('menu'),
		};
	},

	computed: {
		...mapGetters({
			modelStructure: 'model/structure',
			validatorFields: 'validator/fields',
		}),
		enabledMenu() {
			return Boolean(this.scheme.config.modules.filter(i => i.name === 'menu')[0].enable);
		},
	},

	watch: {
		dataLanguage(newLang) {
			this.localization.changeLanguage(newLang);
		},
		dataPage(newPage) {
			this.setNewPage(newPage);
		},
		menuItem() {
			this.setNewPage(this.menuItem);
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
		setNewPage(pageName) {
			this.showContent = false;
			this.pageKey = pageName;
			this.initPage(pageName);
		},
		changePageHandler(key) {
			this.menuItem = key;
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/styles/index.scss';
</style>
