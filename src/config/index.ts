const Config = {
	apiUrl: 'http://localhost:3033/api/v1/public/',
	showDump: true,
};

if (process.env.CUSTOM_MODE === 'dev') {
	Config.showDump = true;
}

export {Config};
