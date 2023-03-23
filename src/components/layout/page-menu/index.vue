<template>
	<div v-if="isEnable" class="menu">
		<ul>
			<li v-for="(page, idx) in menuItems" :key="page.title + idx">
				<button
					class="btn-link"
					:class="{active: pageStructure.id === page.pageId}"
					@click="emitDataKey(page.pageId)"
				>
					{{ $t(page.title) }}
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {SchemeController} from '@/libs/scheme/scheme-controller';
import {PageMenu} from '@/libs/modules/page-menu/page-menu';

export default {
	data() {
		const menuItems = new PageMenu().getList();

		return {
			menuItems,
			isEnable: !!menuItems.length,
			pages: SchemeController.getPages(),
		};
	},
	computed: {
		...mapGetters({
			pageStructure: 'scheme/page',
		}),
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
