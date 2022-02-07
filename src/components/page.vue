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
import {mapGetters, mapMutations} from 'vuex';
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
			if (!status) return;

			if (this.validatorHasError) return;

			this.submitAfterValidation();
		},
	},

	methods: {
		...mapMutations({startValidation: 'validator/startValidation'}),

		handleSubmit() {
			this.startValidation();
		},
		submitAfterValidation() {
			alert('success');
		},
	},
};
</script>
