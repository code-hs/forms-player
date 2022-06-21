interface ResponseError {
	message: string;
	level: number;
	errorCode: number;
}

interface Response {
	data: object;
	success: boolean;
	error: ResponseError;
}

export class ApiResponser {
	static isSuccess(response: Response): boolean {
		return response && response.success;
	}

	static getError(response: Response): ResponseError {
		return response?.error;
	}

	static getData(response: Response): object {
		return response?.data;
	}
}
