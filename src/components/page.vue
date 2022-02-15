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
import {taskStatuses} from '@/classes/validator/validatorUtils';

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
			validatorTaskStatus: 'validator/taskStatus',
		}),
	},

	watch: {
		validatorTaskStatus(status) {
			if (status !== taskStatuses.completed || this.validatorHasError) return;

			this.finishTask();
			this.submitAfterValidation();
		},
	},

	methods: {
		...mapActions({
			startValidation: 'validator/startValidation',
			finishTask: 'validator/finishTask',
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
