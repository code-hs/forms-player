<template>
	<form class="page-item" novalidate @submit.prevent="validatorStart">
		<div class="groups-container">
			<Group
				v-for="(group, index) in page.groups"
				:key="index"
				:group="group"
				:group-index="index"
			/>
		</div>

		<!--		<component :is="`style`" type="text/css" v-html="customStyles"></component>-->
	</form>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Group from '@/components/group';
import {bus} from '@/utils/bus';
import {Api} from '@/classes/api/Api';

export default {
	name: 'Page',
	components: {
		Group,
	},

	data() {
		// global custom styles string
		// const customStyles = '.page-item {background: red}';

		return {
			// customStyles,
		};
	},

	computed: {
		...mapGetters({
			page: 'scheme/currentPage',
			modelStructure: 'model/structure',
		}),
	},

	created() {
		// binding form
		bus.$on('VALIDATION:finish', this.validationFinish);
	},

	methods: {
		...mapActions({
			validatorStart: 'validator/start',
		}),
		validationFinish() {
			// eslint-disable-next-line no-alert
			console.warn('success');
			console.sh(JSON.stringify(this.modelStructure));
			Api.send(this.page, this.modelStructure);
		},
	},
};
</script>
