function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function generateKey() {
	return getRandomNumber(1, 999999999999);
}

export {generateKey};
