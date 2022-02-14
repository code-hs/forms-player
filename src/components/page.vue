<template>
	<form class="page-item" novalidate @submit.prevent="handleSubmit">
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
			validatorHasError: 'validator/hasError',
			validatorTaskCompleted: 'validator/taskCompleted',
		}),
	},

	watch: {
		validatorTaskCompleted(status) {
			if (!status || this.validatorHasError) return;

			this.clearTaskStatus();
			this.submitAfterValidation();
		},
	},

	methods: {
		...mapActions({
			startValidation: 'validator/startValidation',
			clearTaskStatus: 'validator/clearTaskStatus',
		}),
		handleSubmit() {
			this.startValidation();
		},
		submitAfterValidation() {
			// eslint-disable-next-line no-alert
			alert('success');
		},
	},
};
</script>
