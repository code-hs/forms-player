let showDump = false;

if (process.env.CUSTOM_MODE === 'dev') {
	showDump = true;
}

const Config = {
	showDump,
};
export {Config};
