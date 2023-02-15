// @ts-ignore
console.logp = (data: unknown) => {
	console.log(JSON.parse(JSON.stringify(data)));
};
