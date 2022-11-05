<template>
	<div v-if="show" class="text-container" :class="common.class">
		<!--suppress JSUnresolvedVariable JSUnresolvedFunction -->
		<component :is="custom.tag">
			{{ $t(text.value) }}
		</component>
	</div>
</template>

<script>
import {FieldL as FH} from '@/libs/components/field/FieldL';
import {TextContainerL} from '@/libs/components/content/text/TextContainerL';

export default {
	name: 'TextContainer',
	props: {
		common: FH.common,
		validation: FH.plugO,
		virtualKey: FH.virtualKey,
		multiboxIndex: FH.multiboxIndex,
		text: {
			type: Object,
			required: false,
			default: () => ({
				value: '',
			}),
		},
		html: FH.html,
		styles: FH.styles,
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
