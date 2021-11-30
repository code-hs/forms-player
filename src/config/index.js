let showDump = false;

if (process.env.CUSTOM_MODE === 'dev') {
	showDump = true;
}

export default {showDump};
