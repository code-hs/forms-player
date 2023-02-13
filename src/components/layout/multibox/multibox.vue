<template>
	<div v-if="groups.length" class="multibox" :class="common.class" v-bind="attrs.container">
		<div
			v-for="(group, index) in groups"
			:key="index"
			class="multibox__item"
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

		<div class="multibox__buttons-container">
			<ButtonAdd :groups-length="groups.length" @handleAdd="handleAdd" />
		</div>
	</div>
</template>

<script>
import {mapMutations} from 'vuex';
import {Multibox} from '@/libs/components/layout/multibox/multibox';
import {ComponentParams as CP} from '@/libs/components/component/component-params';
import ButtonAdd from './button-add';
import ButtonRemove from './button-remove';

const VirtualComponent = () => import('@/components/virtual-component');

export default {
	name: 'MultiBox',
	components: {
		VirtualComponent,
		ButtonAdd,
		ButtonRemove,
	},
	props: {
		...CP.getAllParams(),
		attrs: CP.attrsOnlyContainer,
	},
	data() {
		// мультибокс = [группа1, группа2, группа3]
		// в группе уже хранятся поля = [поле1, поле2, поле3]
		// предполагается что в схеме указана только одна группа от мультибокса
		// и в этой первой группе прописываем информацию о мультибоксе
		const groups = new Multibox(this.components, this.common.model).createGroups();

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
			this.addItemInMultiBox({multiboxName: this.common.model});
			// add item to view
			const group = Multibox.createGroup(this.groups);
			this.groups.push(group);
		},
		handleRemove(index) {
			// delete from model
			this.removeItemInMultiBox({
				multiboxName: this.common.model,
				itemIndex: index,
			});

			// delete from view
			this.groups.splice(index, 1);
		},
	},
};
</script>
