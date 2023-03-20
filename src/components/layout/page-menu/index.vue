<template>
	<div class="menu">
		<ul>
			<li
				v-for="(page, idx) in moduleMenu"
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

export default {
	props: {
		moduleMenu: {
			type: Array,
			default: null,
			required: true,
		},
	},
	data() {
		return {
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
			const pages = SchemeController.getPages();
			this.filteredPages = pages
				.filter(item => this.moduleMenu.findIndex(i => i.pageId === item.id) !== -1)
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
