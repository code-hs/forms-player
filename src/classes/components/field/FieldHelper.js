export class FieldHelper {
	static scrollAndFocusElement(elem) {
		if (!elem) return;

		elem.scrollIntoView({behavior: 'smooth', block: 'center'});
		let posY = window.pageYOffset;

		const interval = setInterval(() => {
			if (posY === window.pageYOffset) {
				// scrolling stopped
				elem.focus();
				clearInterval(interval);
			}

			posY = window.pageYOffset;
		}, 100);
	}
}
