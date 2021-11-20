<template>
	<div class="group-item">
		<span class="title"> {{ group.name }} </span>

		<div class="fieldsets-container">
			<Fieldset
				v-for="(fieldset, index) in group.fieldsets"
				:key="index"
				:fieldset="fieldset"
				:fieldsets-count="group.fieldsets.length"
				:inputs-structure="inputsStructure"
				:group-index="groupIndex"
				:fieldset-index="index"
				:enableMultiple="!!group.multiple"
				@remove="handleButRemove"
			/>
		</div>

		<div class="buttons-container" v-if="group.multiple">
			<div v-show="showButAdd" class="button-add" @click="handleButAdd()">
				+
			</div>
		</div>
	</div>
</template>

<script>
import Fieldset from '@/components/Fieldset';

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
		inputsStructure: {
			// global input values store
			type: Array,
			required: true,
		},
		groupIndex: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			// main model, current group array
			modelGroup: this.inputsStructure[this.groupIndex],
		};
	},
	computed: {
		showButAdd() {
			return this.group.fieldsets && this.group.fieldsets.length > 0;
		},
	},
	methods: {
		handleButRemove(fieldsetIndex) {
			// remove by fieldset index
			this.removeFieldsetItem(fieldsetIndex);
		},
		handleButAdd() {
			this.copyFieldset();
		},
		removeFieldsetItem(index) {
			// eslint-disable-next-line vue/no-mutating-props
			this.group.fieldsets.splice(index, 1);
			// отправляемся в модель текущей группы, и удаляем из нее fieldset
			this.modelGroup.splice(index, 1);
		},
		copyFieldset() {
			const fieldsetExampleIndex = 0;
			// need add new item to model
			const sourceFieldsetModel = this.modelGroup[fieldsetExampleIndex];
			// without reactivity
			const newFieldSetModel = JSON.parse(JSON.stringify(sourceFieldsetModel));
			this.modelGroup.push(newFieldSetModel);

			// add new item to view
			const sourceFieldset = this.group.fieldsets[fieldsetExampleIndex];
			// eslint-disable-next-line vue/no-mutating-props
			this.group.fieldsets.push(sourceFieldset);
		},
	},
};
</script>
