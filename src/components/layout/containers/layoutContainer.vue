<template>
	<div class="layout-container" :class="common.class" v-bind="attrs">
		<VirtualComponent
			v-for="(component, index) in components"
			:key="index"
			:scheme-options="component"
			:multibox-index="multiboxIndex"
		/>
	</div>
</template>

<script>
import {FieldL as FH} from '@/libs/components/field/FieldL';

const VirtualComponent = () => import('@/components/virtualComponent');

export default {
	name: 'LayoutContainer',
	components: {
		VirtualComponent,
	},
	props: {
		common: FH.common,
		attrs: FH.attrs,
		validation: FH.plugO,
		virtualKey: FH.virtualKey,
		multiboxIndex: FH.multiboxIndex,
		html: FH.html,
		styles: FH.styles,
		components: FH.components,
	},
};
</script>
