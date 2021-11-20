let endpoint = 'dev';
let wsRoute = 'dev';

if (process.env.NODE_MODE === 'prod') {
	endpoint = 'prod';
	wsRoute = 'prod';
}

export default {wsRoute, endpoint};
