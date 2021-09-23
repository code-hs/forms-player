let endpoint;
let wsRoute;

const useProdConfig = process.env.mode;
if (useProdConfig) {
	endpoint = 'prod';
	wsRoute = 'prod';
} else {
	endpoint = 'dev';
	wsRoute = 'dev';
}

export default {wsRoute, endpoint};
