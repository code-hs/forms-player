<template>
	<div v-if="hasContent" class="column" :class="getClasses()">
		<VirtualComponent
			v-for="(component, index) in components"
			:key="index"
			:scheme-options="component"
			:multibox-index="multiboxIndex"
		/>
	</div>
</template>

<script>
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper';

const VirtualComponent = () => import('@/components/virtualComponent');

export default {
	name: 'LayoutColumn',
	components: {
		VirtualComponent,
	},
	props: {
		generalParams: FH.generalParams,
		customParams: FH.customParams,
		components: FH.components,
		multiboxIndex: FH.multiboxIndex,
	},

	computed: {
		hasContent() {
			return this.generalParams && this.components.length;
		},
	},

	methods: {
		getClasses() {
			let classes = '';

			// col-6, col-12,...
			// noinspection JSUnresolvedVariable
			if (this.customParams?.col) {
				classes += `col-${this.customParams.col}`;
			} else {
				// col size default value
				classes += 'col-6';
			}

			return classes;
		},
	},
};
</script>
