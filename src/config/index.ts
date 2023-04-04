const Config = {
	apiUrl: 'http://localhost:3033/api/v1/public/',
	showDump: false,
};

if (process.env.CUSTOM_MODE === 'dev') {
	Config.showDump = true;
}

Object.freeze(Config);
export {Config};
