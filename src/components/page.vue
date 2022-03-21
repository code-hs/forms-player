<template>
	<form class="page-item" novalidate @submit.prevent="validatorStart">
		<div class="groups-container">
			<Group
				v-for="(group, index) in pageStructure.groups"
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
import {ApiResponser} from '@/classes/api/ApiResponser';

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
			pageStructure: 'scheme/pageStructure',
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
			saveForm: 'request/saveFormValues',
		}),
		async validationFinish() {
			const res = await this.saveForm({
				pageStructure: this.pageStructure,
				values: this.modelStructure,
			});
			if (!ApiResponser.isSuccess(res)) {
				console.log(ApiResponser.getError(res));
				return;
			}

			const data = ApiResponser.getData(res);
			alert('success');
		},
	},
};
</script>
