<template>
	<div>
		<Displayer />
		<Disabler />
	</div>
</template>

<script>
import Displayer from './displayer';
import Disabler from './disabler';

export default {
	name: 'Actioner',
	components: {
		Displayer,
		Disabler,
	},
};
</script>
