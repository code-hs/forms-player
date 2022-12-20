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
import {ComponentParams as CP} from '@/libs/components/component/component-params';

const VirtualComponent = () => import('@/components/virtual-component');

export default {
	name: 'LayoutContainer',
	components: {
		VirtualComponent,
	},
	props: CP.getAllParams(),
};
</script>
