<template>
	<div>
		<Displayer />
		<Disabler />
		<Checker />
	</div>
</template>

<script>
import Displayer from './displayer';
import Disabler from './disabler';
import Checker from './checker';

export default {
	name: 'Actioner',
	components: {
		Displayer,
		Disabler,
		Checker,
	},
};
</script>
