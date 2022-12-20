<template>
	<div
		v-if="show"
		class="text-container"
		:class="common.class"
		v-bind="attrs.container"
	>
		<!--suppress JSUnresolvedVariable JSUnresolvedFunction -->
		<component :is="custom.tag" v-bind="attrs.component">
			{{ $t(text.value) }}
		</component>
	</div>
</template>

<script>
import {ComponentParams as CP} from '@/libs/components/component/component-params';
import {TextContainerL} from '@/libs/components/content/text/text-container';

export default {
	name: 'TextContainer',
	props: {
		common: CP.common,
		attrs: CP.attrs,
		validation: CP.plugO,
		virtualKey: CP.virtualKey,
		multiboxIndex: CP.multiboxIndex,
		text: {
			type: Object,
			required: false,
			default: () => ({
				value: '',
			}),
		},
		html: CP.html,
		styles: CP.styles,
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
