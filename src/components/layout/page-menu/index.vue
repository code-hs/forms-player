<template>
	<div class="menu">
		<ul>
			<li
				v-for="(page, idx) in moduleConfig.pages"
				:key="page.title + idx"
				:class="{'not-enable': !page.enable}"
			>
				<button
					v-if="page.enable"
					class="btn-link"
					:class="{active: pageStructure.id === page.pageId}"
					@click="emitDataKey(page.pageId)"
				>
					{{ page.title }}
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {SchemeController} from '@/libs/scheme/scheme-controller';
import {ModuleController} from '@/libs/modules/module-controller';

export default {
	data() {
		return {
			moduleConfig: ModuleController.getModuleConfig('menu'),
			pages: SchemeController.getPages(),
			filteredPages: [],
		};
	},
	computed: {
		...mapGetters({
			pageStructure: 'scheme/page',
		}),
	},
	created() {
		this.mapPages();
	},
	methods: {
		mapPages() {
			this.filteredPages = this.pages
				.filter(item => this.moduleConfig.pages.findIndex(i => i.pageId === item.id) !== -1)
				.map(el => ({
					pageId: el.id,
					key: el.key,
				}));
		},
		emitDataKey(pageId) {
			const key = this.filteredPages.filter(i => i.pageId === pageId)[0].key;
			this.$emit('changePage', key);
		},
	},
};
</script>
