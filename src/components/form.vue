<template>
	<form class="form grid-container" novalidate @submit.prevent="validatorStart">
		<VirtualComponent
			v-for="(component, index) in pageStructure.components"
			:key="index"
			:scheme-options="component"
		/>

		<!--		<component :is="`style`" type="text/css" v-html="customStyles"></component>-->
	</form>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import VirtualComponent from '@/components/virtualComponent';
import {bus, busBroadcasts} from '@/utils/bus';
import {ApiResponser} from '@/classes/api/ApiResponser';

// noinspection JSUnresolvedFunction
export default {
	name: 'Form',
	components: {
		VirtualComponent,
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
		this.initValidation();
	},

	methods: {
		...mapActions({
			validatorStart: 'validator/start',
			saveForm: 'request/saveFormValues',
		}),
		initValidation() {
			// binding form
			// noinspection JSUnresolvedFunction
			bus.$on(busBroadcasts.VALIDATION_END, this.validationFinish);
		},
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
