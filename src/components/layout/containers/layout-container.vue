<template>
	<div class="layout-container" :class="common.class" v-bind="attrs.container">
		<VirtualComponent
			v-for="(component, index) in components"
			:key="index"
			:scheme-options="component"
			:multibox-index="multiboxIndex"
		/>
	</div>
</template>

<script>
import {FieldL as FL} from '@/libs/components/field/field';

const VirtualComponent = () => import('@/components/virtual-component');

export default {
	name: 'LayoutContainer',
	components: {
		VirtualComponent,
	},
	props: {
		common: FL.common,
		attrs: FL.attrs,
		validation: FL.plugO,
		virtualKey: FL.virtualKey,
		multiboxIndex: FL.multiboxIndex,
		html: FL.html,
		styles: FL.styles,
		components: FL.components,
	},
};
</script>
