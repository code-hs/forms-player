<template>
	<div v-if="show" class="text-container" :class="common.class" v-bind="attrs">
		<!--suppress JSUnresolvedVariable JSUnresolvedFunction -->
		<component :is="custom.tag">
			{{ $t(text.value) }}
		</component>
	</div>
</template>

<script>
import {FieldL as FL} from '@/libs/components/field/field';
import {TextContainerL} from '@/libs/components/content/text/text-container';

export default {
	name: 'TextContainer',
	props: {
		common: FL.common,
		attrs: FL.attrs,
		validation: FL.plugO,
		virtualKey: FL.virtualKey,
		multiboxIndex: FL.multiboxIndex,
		text: {
			type: Object,
			required: false,
			default: () => ({
				value: '',
			}),
		},
		html: FL.html,
		styles: FL.styles,
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
			show: TextContainerL.isShow(this),
		};
	},
};
</script>
