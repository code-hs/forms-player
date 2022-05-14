<template>
	<div v-if="groups.length" class="multi-box-container">
		<div v-for="(group, index) in groups" :key="index" class="multi-box-item">
			<div class="button-remove" @click="handleButRemove(index)">
				remove down
			</div>

			<VirtualComponent
				v-for="field in group"
				:key="field.customParams.multi.key"
				:multibox-index="index"
				:component-data="field"
			/>
		</div>

		<div class="button-add" @click="handleButAdd()">add</div>
	</div>
</template>

<script>
import {mapMutations} from 'vuex';
import {MultiBoxView} from './MultiBoxView';

const VirtualComponent = () => import('@/components/virtualComponent');

export default {
	name: 'MultiBox',
	components: {
		VirtualComponent,
	},
	props: {
		generalParams: {
			type: Object,
			required: true,
		},
		customParams: {
			type: Object,
			required: true,
		},
		components: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			groups: MultiBoxView.initGroups(
				this.components,
				this.generalParams.model
			),
		};
	},

	methods: {
		...mapMutations({
			addItemInMultiBox: 'model/addItemInMultiBox',
			removeItemInMultiBox: 'model/removeItemInMultiBox',
		}),
		handleButAdd() {
			// add store object in model
			this.addItemInMultiBox({
				multiBoxName: this.generalParams.model,
			});
			const newItem = MultiBoxView.getNewItem(this.groups);

			this.groups.push(newItem);
		},
		handleButRemove(index) {
			// delete from model
			this.removeItemInMultiBox({
				multiBoxName: this.generalParams.model,
				itemIndex: index,
			});

			// delete from view
			this.groups.splice(index, 1);
		},
	},
};
</script>
