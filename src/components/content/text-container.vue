<template>
	<div v-if="show" class="text-container" :class="classes.container" v-bind="attrs.container">
		<!--suppress JSUnresolvedVariable JSUnresolvedFunction -->
		<component :is="custom.tag" v-bind="attrs.component">
			{{ $t(text.value) }}
		</component>
	</div>
</template>

<script>
import {ComponentParams as CP} from '@/libs/components/component/component-params';
import {TextContainerL} from '@/libs/components/content/text/text-container';
import {FieldL as FL} from '@/libs/components/field/field';

export default {
	name: 'TextContainer',
	props: {
		...CP.getAllParams(),
		text: {
			type: Object,
			required: false,
			default: () => ({
				value: '',
			}),
		},
		custom: {
			type: Object,
			required: false,
			default: () => ({
				tag: '',
			}),
		},
	},

	data() {
		return {
			classes: FL.getClasses(this),
			show: TextContainerL.isShow(this),
		};
	},
};
</script>
