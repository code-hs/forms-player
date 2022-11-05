<template>
	<div class="layout-container" :class="common.class">
		<VirtualComponent
			v-for="(component, index) in components"
			:key="index"
			:scheme-options="component"
			:multibox-index="multiboxIndex"
		/>
	</div>
</template>

<script>
import {FieldHelper as FH} from '@/libs/components/field/FieldHelper';

const VirtualComponent = () => import('@/components/virtualComponent');

export default {
	name: 'LayoutContainer',
	components: {
		VirtualComponent,
	},
	props: {
		common: FH.common,
		validation: FH.plugO,
		virtualKey: FH.virtualKey,
		multiboxIndex: FH.multiboxIndex,
		html: FH.html,
		styles: FH.styles,
		components: FH.components,
	},
};
</script>
