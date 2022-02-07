<template>
	<div class="group-item">
		<!--		<span class="title"> {{ group.name }} </span>-->

		<div class="fieldsets-container">
			<Fieldset
				v-for="(fieldset, index) in group.fieldsets"
				:key="fieldset.key"
				:fieldset="fieldset"
				:group-index="groupIndex"
				:fieldset-index="index"
				:fieldsets-count="group.fieldsets.length"
				:enable-multiple="!!group.multiple"
				@remove="handleButRemove"
			/>
		</div>

		<div class="buttons-container">
			<!--suppress JSUnresolvedVariable -->
			<div
				v-show="showButAdd"
				v-if="group.multiple"
				class="button-add"
				@click="handleButAdd()"
			>
				{{ group.multiple.buttonText }}
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import Fieldset from '@/components/fieldset';
import {generateKey} from '@/utils/numbers';
import {GroupView} from '@/classes/group/GroupView';

export default {
	name: 'Group',
	components: {
		Fieldset,
	},

	props: {
		group: {
			type: Object,
			required: true,
		},
		groupIndex: {
			type: Number,
			required: true,
		},
	},

	computed: {
		...mapGetters({modelStructure: 'model/structure'}),
		showButAdd() {
			// show button + if we have at least one item.
			// this item need for use as example for copy
			return this.group.fieldsets?.length;
		},
	},

	created() {
		this.initFieldsetsKeys();
	},

	methods: {
		...mapMutations({
			removeFieldsetItem: 'model/removeFieldsetItem',
			copyFieldsetItem: 'model/copyFieldsetItem',
			validatorRemoveFieldsetItem: 'validator/removeFieldsetItem',
			validatorCopyFieldsetItem: 'validator/copyFieldsetItem',
		}),
		initFieldsetsKeys() {
			// generate unique keys for each item, since we remove and add these items
			// if this is not done, vue lazily updates the blocks
			this.group.fieldsets.forEach(item => {
				item.key = generateKey();
			});
		},
		handleButRemove(fieldsetIndex) {
			// remove by fieldset index
			this.group.fieldsets.splice(fieldsetIndex, 1);

			const position = {groupIndex: this.groupIndex, fieldsetIndex};
			this.removeFieldsetItem(position);
			this.validatorRemoveFieldsetItem(position);
		},
		handleButAdd() {
			// add new item to inputs structure
			this.copyFieldsetItem({groupIndex: this.groupIndex});
			this.validatorCopyFieldsetItem({groupIndex: this.groupIndex});

			// add new item to view
			const newItem = GroupView.getNewItem(this.group.fieldsets);
			this.group.fieldsets.push(newItem);
		},
	},
};
</script>
