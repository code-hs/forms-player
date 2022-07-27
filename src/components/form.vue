<template>
	<form
		class="form grid-container"
		:class="pageClass"
		novalidate
		@submit.prevent="validatorStart"
	>
		<VirtualComponent
			v-for="(component, index) in pageStructure.components"
			:key="index"
			:scheme-options="component"
		/>

		<StyleIncluder v-if="pageStructure.styles" :styles="pageStructure.styles" />
	</form>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import VirtualComponent from '@/components/virtualComponent';
import {bus, busBroadcasts} from '@/utils/bus';
import {ApiResponser} from '@/classes/api/ApiResponser';
import StyleIncluder from '@/components/utils/styleIncluder';

// noinspection JSUnresolvedFunction
export default {
	name: 'Form',
	components: {
		VirtualComponent,
		StyleIncluder,
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
			saveForm: 'request/saveFormValues',
		}),
		initClass() {
			this.pageClass = this.pageStructure?.common?.class || '';
		},
		initValidation() {
			// binding form
			// noinspection JSUnresolvedFunction
			bus.$on(
				busBroadcasts.VALIDATION_FINISH_SUCCESS,
				this.validationFinishSuccess
			);
		},
		async validationFinishSuccess() {
			const res = await this.saveForm({
				page: this.pageStructure,
				values: this.modelStructure,
			});

			if (!ApiResponser.isSuccess(res)) {
				console.log(ApiResponser.getError(res));
			}

			// const data = ApiResponser.getData(res);
			// alert('success');
		},
	},
};
</script>
