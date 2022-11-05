<template>
	<div v-if="groups.length" class="multibox" :class="common.class">
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
				:key="field.custom.multi.key"
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
import {MultiBoxView} from '@/libs/components/layout/multibox/MultiBoxView';
import {FieldL as FH} from '@/libs/components/field/FieldL';
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
		common: FH.common,
		components: FH.components,
		custom: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		virtualKey: FH.plugN,
		multiboxIndex: FH.plugN,
	},
	data() {
		const groups = MultiBoxView.generateGroups(
			this.components,
			this.common.model
		);

		return {
			groups,
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
				multiBoxName: this.common.model,
			});

			// add item to view
			const group = MultiBoxView.generateNewGroup(this.groups);
			this.groups.push(group);
		},
		handleRemove(index) {
			// delete from model
			this.removeItemInMultiBox({
				multiBoxName: this.common.model,
				itemIndex: index,
			});

			// delete from view
			this.groups.splice(index, 1);
		},
	},
};
</script>
