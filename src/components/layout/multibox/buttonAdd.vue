<template>
	<div
		v-show="groupsLength"
		class="multibox__button-add"
		@click="$emit('handleAdd')"
	>
		+
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
	},
	emits: ['handleAdd'],
};
</script>
