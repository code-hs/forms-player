<template>
	<form class="page-item" novalidate @submit.prevent="submit">
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

export default {
	name: 'Page',
	components: {
		Group,
	},

	data() {
		// В дальнейшем уже продумывать, как добавлять стили, то ли тут все - все
		// прописать. А потом в элементах добавлять новые классы, или как кто
		// захочет. Тут уж все доступно и открыто
		// const customStyles = '.page-item {background: red}';

		return {
			// customStyles,
		};
	},

	computed: {
		...mapGetters({page: 'scheme/currentPage'}),
	},
	methods: {
		submit() {
			console.log('submit handler');
		},
	},
};
</script>
