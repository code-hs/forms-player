export class ApiResponser {
	/**
	 * @param {Object} response - Api response
	 * @returns {boolean}
	 */
	static isSuccess(response) {
		return response && response.success === true;
	}

	/**
	 * @param {Object} response - Api response
	 * @returns {Object|boolean}
	 */
	static getError(response) {
		if (!response) return false;

		return response.error;
	}

	/**
	 * @param {Object} response - Api response
	 * @returns {Object|boolean}
	 */
	static getData(response) {
		if (!response || !response.data) return false;

		return response.data;
	}
}
