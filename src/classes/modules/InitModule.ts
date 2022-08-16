export class InitModule {
	static init(
		checker: Function,
		successLoad: Function,
		failLoad: Function,
		failLoadCount = 5
	) {
		if (!checker()) {
			// module files are not loaded
			// wait, then try again
			// eslint-disable-next-line no-param-reassign
			failLoadCount--;
			if (failLoadCount === 0) {
				// after 5 tries, 1500ms, module are not loaded, call failLoad function
				failLoad();
				return;
			}

			setTimeout(() => {
				this.init(checker, successLoad, failLoad, failLoadCount);
			}, 300);
			return;
		}

		successLoad();
	}
}
