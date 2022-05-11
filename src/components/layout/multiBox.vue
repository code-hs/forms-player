<template>
	<div v-if="components.length" class="multi-box-container">
		<div
			v-for="(group, groupIndex) in groups"
			:key="'group' + groupIndex"
			class="multi-box-item"
		>
			<div class="button-remove" @click="handleButRemove(groupIndex)">
				remove down
			</div>

			<VirtualComponent
				v-for="field in group"
				:key="field.customParams.multi.randomKey"
				:group-index="groupIndex"
				:component-data="field"
			/>
		</div>

		<div class="button-add" @click="handleButAdd()">add</div>
	</div>
</template>

<script>
import {mapMutations} from 'vuex';
import {generateKey} from '@/utils/random';

const VirtualComponent = () => import('@/components/virtualComponent');

export default {
	name: 'MultiBox',
	components: {
		VirtualComponent,
	},
	props: {
		// below params from v-bind
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
		const groups = [];

		if (this.components.length) {
			this.components.forEach(field => {
				field.customParams.multi = {
					randomKey: generateKey(),
					boxModel: this.generalParams.model,
					groupIndex: 0,
				};
			});

			groups.push(this.components);
		}

		return {
			groups,
		};
	},

	created() {},
	methods: {
		...mapMutations({
			copyGroupItem: 'model/copyGroupItem',
			removeGroupItem: 'model/removeGroupItem',
		}),

		handleButAdd() {
			this.copyGroupItem({
				groupName: this.generalParams.model,
			});

			// check element, const index;
			const newFieldset = JSON.parse(JSON.stringify(this.groups[0]));

			newFieldset.forEach(field => {
				field.customParams.multi.randomKey = generateKey();

				const lastGroup = this.groups[this.groups.length - 1];
				const lastField = lastGroup[lastGroup.length - 1];
				const newIndex = lastField.customParams.multi.groupIndex + 1;

				field.customParams.multi.groupIndex = newIndex;
			});

			this.groups.push(newFieldset);
		},
		handleButRemove(index) {
			this.removeGroupItem({
				groupName: this.generalParams.model,
				groupItemIndex: index,
			});

			this.groups.splice(index, 1);
		},
	},
};
</script>
