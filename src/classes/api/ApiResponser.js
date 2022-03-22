export class ApiResponser {
	/**
	 * @param {Object} response - Api response
	 * @returns {boolean}
	 */
	static isSuccess(response) {
		return (
			response &&
			response.status === 200 &&
			response.data &&
			response.data.success === true
		);
	}

	/**
	 * @param {Object} response - Api response
	 * @returns {Object|boolean}
	 */
	static getError(response) {
		if (!response) return false;

		return response.data.error;
	}

	/**
	 * @param {Object} response - Api response
	 * @returns {Object|boolean}
	 */
	static getData(response) {
		if (!response || !response.data.data) return false;

		return response.data.data;
	}
}
