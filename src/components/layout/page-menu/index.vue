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
					@click="emitDataPage(page.pageId)"
				>
					{{ page.title }}
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
	props: {
		moduleMenu: {
			type: Object,
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
			sPages: 'scheme/pages',
		}),
	},
	created() {
		this.mapPages();
	},
	methods: {
		mapPages() {
			this.filteredPages = this.sPages
				.filter(item => this.moduleMenu.findIndex(i => i.pageId === item.id) !== -1)
				.map(el => ({
					pageId: el.id,
					key: el.key,
				}));
		},
		emitDataPage(pageId) {
			const key = this.filteredPages.filter(i => i.pageId === pageId)[0].key;
			this.$emit('dataPageHandler', key);
		},
	},
};
</script>
