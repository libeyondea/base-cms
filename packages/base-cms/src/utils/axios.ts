import axios from 'axios';

import { HOST_API } from '~/config';
import { store } from '~/store';

const axiosServices = axios.create({
	baseURL: HOST_API
});

axiosServices.interceptors.request.use(
	(config) => {
		const token = store.getState().auth?.token;
		if (config.headers && !config.headers.Authorization && token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosServices.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export { axiosServices };
