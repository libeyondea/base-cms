import axios from 'axios';

import { HOST_API } from '~/config';
import { getCookie } from '~/utils/cookie';

const axiosServices = axios.create({
	baseURL: HOST_API
});

axiosServices.interceptors.request.use(
	(config) => {
		// Get token from cookie instead of Redux store
		const token = getCookie('service_token');
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

// Allow consumers to customize the axios baseURL at runtime
export const setAxiosBaseURL = (baseURL: string): void => {
	axiosServices.defaults.baseURL = baseURL;
};

export const getAxiosBaseURL = (): string | undefined => {
	return axiosServices.defaults.baseURL;
};

export { axiosServices };
