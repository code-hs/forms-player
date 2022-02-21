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
import {mapGetters} from 'vuex';
import Group from '@/components/group';
import {bus} from '@/utils/bus';

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
		}),
	},

	created() {
		bus.$on('finish-validation', this.validationFinish);
	},

	methods: {
		handleSubmit() {
			bus.$emit('start-validation');
		},
		validationFinish(isValidForm) {
			if (!isValidForm) return;

			// eslint-disable-next-line no-alert
			alert('success');
		},
	},
};
</script>
