<template>
	<div v-if="show" class="text-container" :class="common.class">
		<component :is="custom.tag">
			{{ $t(text.value) }}
		</component>
		<StyleIncluder :styles="styles.value" />
	</div>
</template>

<script>
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper.ts';
import {TextContainerHelper} from '@/classes/components/content/text/TextContainerHelper.ts';
import StyleIncluder from '@/components/utils/styleIncluder';

export default {
	name: 'TextContainer',
	components: {
		StyleIncluder,
	},
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
			show: TextContainerHelper.isShow(this),
		};
	},
};
</script>
