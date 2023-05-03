<template>
	<div
		class="wdf-app"
		:data-menu-state="[showMenu ? 'open-menu' : '']"
		:data-layout="dataLayout"
		:data-theme="dataTheme"
	>
		<Burger @emitMenuState="getMenuState" />
		<PageMenu @changePage="changePageHandler" />
		<div v-if="showContent" class="form-wrapper">
			<FormC />

			<StyleIncluder />
			<ValidationFocus />
			<Actioner />

			<div v-if="dataDumpModel" class="dump">{{ modelStructure }}</div>
			<!--		<div v-if="showDump" class="dump">{{ validatorFields }}</div>-->
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import FormC from '@/components/form';
import {Api} from '@/libs/api/api';
import ValidationFocus from '@/components/utils/validation/focus';
import StyleIncluder from '@/components/utils/style/style-includer';
import Actioner from '@/components/utils/actioner';
import PageMenu from '@/components/layout/page-menu';
import Burger from '@/components/layout/page-menu/burger';
import {SchemeController} from '@/libs/scheme/scheme-controller';
import {Submitter} from '@/libs/main/submitter';

export default {
	components: {FormC, ValidationFocus, StyleIncluder, Actioner, PageMenu, Burger},
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
		// show/hide dump block
		dataDumpModel: {
			type: Boolean,
			required: false,
			default: false,
		},
	},

	data() {
		return {
			menuItem: '',
			pageKey: '',
			showContent: false,
			scheme: null,
			showMenu: false,
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
			this.setPage(newPage);
		},
		menuItem() {
			this.setPage(this.menuItem);
		},
	},

	created() {
		if (!this.dataPage) {
			throw new Error('app.created: attr data-page is empty');
		}

		this.scheme = SchemeController.load();
		this.setPage(this.getPageKey());
		this.initPlugins();
	},

	methods: {
		...mapMutations({
			generateModelSkeleton: 'model/generateSkeleton',
		}),
		...mapActions({
			sInitPage: 'scheme/initPage',
			setModelValues: 'model/setValues',
		}),
		initPlugins() {
			Api.init(this.dataProjectId);
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
		async setPage(pageName) {
			this.showContent = false;
			this.pageKey = pageName;
			// and what do next ?
			// set in model values

			await this.initPage();

			const modelValues = Submitter.getValues(pageName);
			if (modelValues) this.setModelValues(modelValues);
		},
		changePageHandler(key) {
			this.menuItem = key;
		},
		getMenuState(v) {
			this.showMenu = v;
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/styles/index.scss';
</style>
