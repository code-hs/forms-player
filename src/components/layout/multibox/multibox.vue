<template>
	<div v-if="groups.length" class="multibox" :class="classes.container" v-bind="attrs.container">
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

			<!--suppress JSUnresolvedVariable 1-->
			<div v-if="custom.title" class="multibox__item-title">{{ generateTitle(index) }}</div>

			<VirtualComponent
				v-for="field in group"
				:key="field.custom.multi.key"
				:scheme-options="field"
				:multibox-index="index"
			/>
		</div>

		<div class="multibox__buttons-container">
			<ButtonAdd :groups-length="groups.length" :text="text.addButton" @handleAdd="handleAdd" />
		</div>
	</div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex';
import {Multibox} from '@/libs/components/layout/multibox/multibox';
import {ComponentParams as CP} from '@/libs/components/component/component-params';
import {FieldL as FL} from '@/libs/components/field/field';
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
		custom: {
			type: Object,
			required: false,
			default: () => ({
				title: '',
				addIndex: true,
			}),
		},
	},
	data() {
		return {
			groups: null,
			classes: FL.getClasses(this.common),
			addIndexInTitle: this.custom.addIndex ?? true,
		};
	},
	computed: {
		...mapGetters({
			modelStructure: 'model/structure',
		}),
		showMultipleSeparator() {
			return this.groups.length > 1;
		},
	},
	created() {
		// this.modelStructure work only in created() hook
		// all components in multibox wrapped in object and in array
		this.groups = new Multibox(this.components, this.common.model).createGroups(
			this.modelStructure
		);
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
		generateTitle(index) {
			if (!this.custom.title) return '';

			const locatedStr = this.$t(this.custom.title);

			if (this.addIndexInTitle) return `${locatedStr}${index + 1}`;
			return locatedStr;
		},
	},
};
</script>
