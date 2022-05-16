<template>
	<div class="buttons-container">
		<div
			v-show="groupsLength > 1"
			class="button-remove"
			@click="$emit('handleRemove', groupIndex)"
		>
			✖
		</div>
	</div>
</template>

<script>
export default {
	props: {
		groupsLength: {
			type: Number,
			required: true,
		},
		groupIndex: {
			type: Number,
			required: true,
		},
	},
	emits: ['handleRemove'],
};
</script>
