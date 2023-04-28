interface ResponseError {
	message: string;
	level: number;
	errorCode: number;
}

interface Response {
	data?: object;
	success: boolean;
	error?: ResponseError;
}

export class ApiResponser {
	static getSuccess(): Response {
		return {
			success: true,
		};
	}

	static isSuccess(response: Response): boolean {
		return response && response.success;
	}

	static getError(response: Response): ResponseError | undefined {
		return response?.error;
	}

	static getData(response: Response): object | undefined {
		return response?.data;
	}
}
