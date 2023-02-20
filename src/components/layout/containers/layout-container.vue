<template>
	<div class="layout-container" :class="classes.container" v-bind="attrs.container">
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
import {FieldL as FL} from '@/libs/components/field/field';

const VirtualComponent = () => import('@/components/virtual-component');

export default {
	name: 'LayoutContainer',
	components: {
		VirtualComponent,
	},
	props: {
		...CP.getAllParams(),
		attrs: CP.attrsOnlyContainer,
	},
	data() {
		return {
			classes: FL.getClasses(this),
		};
	},
};
</script>
