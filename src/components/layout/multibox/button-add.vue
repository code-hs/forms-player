<template>
	<div v-show="groupsLength" class="multibox__button-add" @click="$emit('handleAdd')">
		{{ $t(text) }}
	</div>
</template>

<script>
// show button + if we have at least one item.
// this item need for use as example for copy
export default {
	props: {
		groupsLength: {
			type: Number,
			required: true,
		},
		text: {
			type: String,
			required: false,
			default: 'add',
		},
	},
	emits: ['handleAdd'],
};
</script>
