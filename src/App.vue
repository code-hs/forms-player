<template>
	<div class="frm__gnrtr-form-s">
		<div
			v-if="currentPage && inputsStructure"
			class="frm__gnrtr-page-container"
		>
			<Page :page="currentPage" :inputs-structure="inputsStructure" />
		</div>

		<div class="frm__gnrtr-dump">
			{{ inputsStructure }}
		</div>
	</div>
</template>

<script>
import Page from './components/Page';
import {mapActions} from 'vuex';

export default {
	components: {Page},
	props: {
		id: {
			// customer id
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			urlHash: window.location.hash.slice(1),
			currentPage: null,
			inputsStructure: null,
		};
	},
	async created() {
		await this.schemeInit(this.id);
		this.currentPage = await this.getPage(this.urlHash);
		this.inputsStructure = await this.generateInputStructure();
	},
	methods: {
		...mapActions({
			schemeInit: 'Form/init',
			getPage: 'Form/getPage',
			generateInputStructure: 'Form/generateInputStructure',
		}),
	},
};
</script>

<style scoped lang="scss">
@import './assets/css/main';
</style>
