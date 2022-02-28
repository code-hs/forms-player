import axios from 'axios';

const axiosObj = axios.create({
	baseURL: 'http://localhost:3033/api/v1/public/',
});

export class Api {
	static send(page, values) {
		const url = 'form/save-form/';
		const sendData = {
			pageKey: page.key,
			values,
		};
		axiosObj.post(url, sendData);
	}
}
