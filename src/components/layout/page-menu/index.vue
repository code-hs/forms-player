<template>
	<div v-if="isEnable" class="menu">
		<ul>
			<li
				v-for="(page, idx) in menuItems"
				:key="page.title + idx"
				:class="{'not-enable': page.disabled}"
			>
				<button
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
		const moduleConfig = ModuleController.getModuleConfig('menu');

		return {
			moduleConfig,
			isEnable: !!moduleConfig,
			menuItems: [],
			pages: SchemeController.getPages(),
		};
	},
	computed: {
		...mapGetters({
			pageStructure: 'scheme/page',
		}),
	},
	created() {
		if (!this.isEnable) return;
		// noinspection JSUnresolvedVariable
		if (!this.moduleConfig.pages) return;

		const pageListIds = this.pages.reduce((acc, pageObj) => [...acc, pageObj.id], []);
		this.menuItems = this.moduleConfig.pages
			.filter(menuItem => pageListIds.includes(menuItem.pageId))
			.filter(menuItem => {
				// noinspection RedundantIfStatementJS
				if ('enable' in menuItem && menuItem.enable === false) return false;
				return true;
			});
	},
	methods: {
		emitDataKey(pageId) {
			const page = this.pages.find(page => page.id === pageId);
			if (!page || !page.key) return;

			this.$emit('changePage', page.key);
		},
	},
};
</script>
