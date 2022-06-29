<template>
	<div class="text-container">
		<component :is="customParams.tag" v-if="text.value">
			{{ $t(text.value) }}
		</component>
	</div>
</template>

<script>
import {FieldHelper as FH} from '@/classes/components/field/FieldHelper.ts';
import {TextContainerHelper} from '@/classes/components/content/text/TextContainerHelper.ts';

export default {
	name: 'TextContainer',
	props: {
		generalParams: FH.generalParams,
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
		customParams: {
			type: Object,
			required: false,
			default: () => ({
				tag: '',
			}),
		},
	},

	created() {
		if (!TextContainerHelper.isAllowedTag(this.customParams.tag)) {
			throw new Error(`Tag ${this.customParams.tag} is not allowed.`);
		}
	},
};
</script>
