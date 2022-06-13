/* eslint-disable no-console */
console.logp = console.log;

console.log = data => {
	console.logp(JSON.parse(JSON.stringify(data)));
};
