<template>
	<div class="page-item">
		<div class="groups-container">
			<Group
				v-for="(group, index) in page.groups"
				:key="index"
				:group="group"
				:inputs-structure="inputsStructure"
				:group-index="index"
			/>
		</div>
	</div>
</template>

<script>
import Group from '@/components/Group';

export default {
	name: 'Page',
	components: {
		Group,
	},
	props: {
		page: {
			type: Object,
			required: true,
		},
		inputsStructure: {
			// global input values store
			type: Array,
			required: true,
		},
	},
	data() {
		return {};
	},
};
</script>
