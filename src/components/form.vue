<template>
	<form class="form" :class="pageClass" novalidate @submit.prevent="validatorStart">
		<VirtualComponent
			v-for="(component, index) in pageStructure.components"
			:key="index"
			:scheme-options="component"
		/>
	</form>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import VirtualComponent from '@/components/virtual-component';
import {bus, busBroadcasts} from '@/libs/utils/bus';
import {ApiResponser} from '@/libs/api/api-responser';

export default {
	name: 'Form',
	components: {
		VirtualComponent,
	},
	data() {
		return {
			pageClass: '',
		};
	},
	computed: {
		...mapGetters({
			pageStructure: 'scheme/page',
			modelStructure: 'model/structure',
		}),
	},
	created() {
		this.initClass();
		this.initValidation();
	},
	methods: {
		...mapActions({
			validatorStart: 'validator/start',
			submitForm: 'request/submitForm',
		}),
		initClass() {
			this.pageClass = this.pageStructure?.common?.class.container || '';
		},
		initValidation() {
			// binding form
			// noinspection JSUnresolvedFunction
			bus.$on(busBroadcasts.VALIDATION_FINISH_SUCCESS, this.validationFinishSuccess);
		},
		async validationFinishSuccess() {
			const res = await this.submitForm({
				page: this.pageStructure,
				values: this.modelStructure,
			});

			if (!ApiResponser.isSuccess(res)) {
				console.log(ApiResponser.getError(res));
			}

			// const data = ApiResponser.getData(res);
			console.log('success');
		},
	},
};
</script>
