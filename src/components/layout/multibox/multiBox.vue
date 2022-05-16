<template>
	<div v-if="groups.length" class="multi-box">
		<div
			v-for="(group, index) in groups"
			:key="index"
			:data-show-multiple-separator="showMultipleSeparator"
			class="multi-box__item"
		>
			<ButtonRemove
				:groups-length="groups.length"
				:group-index="index"
				@handleRemove="handleRemove"
			/>

			<VirtualComponent
				v-for="field in group"
				:key="field.customParams.multi.key"
				:multibox-index="index"
				:component-data="field"
			/>
		</div>

		<ButtonAdd :groups-length="groups.length" @handleAdd="handleAdd" />
	</div>
</template>

<script>
import {mapMutations} from 'vuex';
import {MultiBoxView} from './MultiBoxView';
import ButtonAdd from './buttonAdd';
import ButtonRemove from './buttonRemove';

const VirtualComponent = () => import('@/components/virtualComponent');

export default {
	name: 'MultiBox',
	components: {
		VirtualComponent,
		ButtonAdd,
		ButtonRemove,
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

	computed: {
		showMultipleSeparator() {
			return this.groups.length > 1;
		},
	},

	methods: {
		...mapMutations({
			addItemInMultiBox: 'model/addItemInMultiBox',
			removeItemInMultiBox: 'model/removeItemInMultiBox',
		}),
		handleAdd() {
			// show button + if we have at least one item.
			// this item need for use as example for copy
			if (!this.groups.length) return;

			// add store object in model
			this.addItemInMultiBox({
				multiBoxName: this.generalParams.model,
			});

			// add item to view
			const newItem = MultiBoxView.generateNewItem(this.groups);
			this.groups.push(newItem);
		},
		handleRemove(index) {
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
