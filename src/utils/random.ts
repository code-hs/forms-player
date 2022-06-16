function generateInt(min: number = 0, max: number = 9): number {
	// Generate number from min to max
	// Example: 3
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateKey(): number {
	return generateInt(1, 999999999999);
}

function generateStr(minLetters: number = 3, maxLetters: number = 8): string {
	// Generate string from min to max count letters
	// Example: 0VfE0SaA
	const n = generateInt(minLetters, maxLetters);
	let s = '';
	const abd = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const aL = abd.length;

	// eslint-disable-next-line no-bitwise
	while (s.length < n) s += abd[(Math.random() * aL) | 0];
	return s;
}

function generateHash(): string {
	return (generateStr(20, 20) + Date.now().toString(36)).toLowerCase();
}

export {generateKey, generateInt, generateStr, generateHash};
