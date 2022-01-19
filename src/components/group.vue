<template>
	<div class="group-item">
		<!--		<span class="title"> {{ group.name }} </span>-->

		<div class="fieldsets-container">
			<Fieldset
				v-for="(fieldset, index) in group.fieldsets"
				:key="index"
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
			// кнопка отображается только при условии наличия в "fieldsets": [] элементов,
			// а если их нет, то и смысла нет рисовать кнопку
			// ибо exampleItem будет пустым

			return this.group.fieldsets?.length;
		},
	},

	methods: {
		...mapMutations({
			removeFieldsetItem: 'model/removeFieldsetItem',
			copyFieldsetItem: 'model/copyFieldsetItem',
			validatorRemoveFieldsetItem: 'validator/removeFieldsetItem',
			validatorCopyFieldsetItem: 'validator/copyFieldsetItem',
		}),
		handleButRemove(fieldsetIndex) {
			// remove by fieldset index
			this.group.fieldsets.splice(fieldsetIndex, 1);
			this.removeFieldsetItem({groupIndex: this.groupIndex, fieldsetIndex});

			this.validatorRemoveFieldsetItem({
				groupIndex: this.groupIndex,
				fieldsetIndex,
			});
		},
		handleButAdd() {
			// add new item to inputs structure
			this.copyFieldsetItem({groupIndex: this.groupIndex});
			this.validatorCopyFieldsetItem({groupIndex: this.groupIndex});

			// add new item to view
			const exampleIndex = 0;
			const exampleItem = this.group.fieldsets[exampleIndex];
			this.group.fieldsets.push(exampleItem);
		},
	},
};
</script>
