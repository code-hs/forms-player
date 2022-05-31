<template>
	<div v-if="groups.length" class="multibox">
		<div
			v-for="(group, index) in groups"
			:key="index"
			class="multibox-item"
			:data-show-multiple-separator="showMultipleSeparator"
		>
			<ButtonRemove
				:groups-length="groups.length"
				:group-index="index"
				@handleRemove="handleRemove"
			/>

			<VirtualComponent
				v-for="field in group"
				:key="field.customParams.multi.key"
				:scheme-options="field"
				:multibox-index="index"
			/>
		</div>

		<div class="buttons-container">
			<ButtonAdd :groups-length="groups.length" @handleAdd="handleAdd" />
		</div>
	</div>
</template>

<script>
import {mapMutations} from 'vuex';
import {MultiBoxView} from '@/classes/components/layout/multibox/MultiBoxView';
import {FieldPropser as FP} from '@/classes/components/field/FieldPropser';
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
		generalParams: FP.generalParams,
		components: FP.components,
		customParams: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		itemKey: FP.plugN,
		multiboxIndex: FP.plugN,
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
