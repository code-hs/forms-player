<template>
	<div class="page-item">
		<div class="groups-container">
			<Group
				v-for="(group, index) in page.groups"
				:key="index"
				:group="group"
				:group-index="index"
			/>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import Group from '@/components/Group';

export default {
	name: 'Page',
	components: {
		Group,
	},
	computed: {
		...mapGetters({page: 'Form/page'}),
	},
};
</script>
