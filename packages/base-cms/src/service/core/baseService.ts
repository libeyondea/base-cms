import { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

import { FilterObject, IUniqueId } from '~/types/hook';
import { axiosServices } from '~/utils/axios';

// Interface cho response API
export interface ApiResponse<T = any> {
	data: T;
	[key: string]: any;
}

// Interface cho options của service
export interface ServiceOptions {
	isOtherUrl?: boolean;
	isFormData?: boolean;
	timeout?: number;
}

export abstract class BaseService {
	protected readonly apiName: string;
	protected readonly baseOptions: ServiceOptions;

	constructor(apiName: string, options: ServiceOptions = {}) {
		this.apiName = apiName;
		this.baseOptions = {
			isOtherUrl: false,
			isFormData: false,
			timeout: 30000,
			...options
		};
	}

	/**
	 * Tạo query string từ object parameters
	 */
	protected buildQueryString(params?: FilterObject): string {
		if (!params || Object.keys(params).length === 0) return '';

		// Lọc bỏ các giá trị null, undefined, empty string
		const filteredParams = Object.entries(params).reduce(
			(acc, [key, value]) => {
				if (value !== null && value !== undefined && value !== '') {
					acc[key] = value;
				}
				return acc;
			},
			{} as Record<string, any>
		);

		return qs.stringify(filteredParams, { addQueryPrefix: true });
	}

	/**
	 * Wrapper cho axios request
	 */
	protected async makeRequest<T = any>(
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
		url: string,
		data?: any,
		config?: AxiosRequestConfig,
		options?: ServiceOptions
	): Promise<AxiosResponse<T>> {
		const mergedOptions = { ...this.baseOptions, ...options };
		const apiUrl = mergedOptions.isOtherUrl ? url : `${this.apiName}${url}`;
		const fullUrl = url.startsWith('http') ? url : apiUrl;

		const requestConfig: AxiosRequestConfig = {
			timeout: mergedOptions.timeout,
			headers: mergedOptions.isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
			...config
		};

		let response: AxiosResponse<T>;

		switch (method) {
			case 'GET':
				response = await axiosServices.get(fullUrl, requestConfig);
				break;
			case 'POST':
				response = await axiosServices.post(fullUrl, data, requestConfig);
				break;
			case 'PUT':
				response = await axiosServices.put(fullUrl, data, requestConfig);
				break;
			case 'DELETE':
				response = await axiosServices.delete(fullUrl, { ...requestConfig, data });
				break;
			case 'PATCH':
				response = await axiosServices.patch(fullUrl, data, requestConfig);
				break;
			default:
				throw new Error(`Unsupported HTTP method: ${method}`);
		}

		return response;
	}

	/**
	 * GET - Lấy tất cả dữ liệu với filtering và pagination
	 */
	public async getAll<T = any>(
		params?: FilterObject,
		path?: string,
		config?: AxiosRequestConfig,
		options?: ServiceOptions
	): Promise<AxiosResponse<ApiResponse<T[]>>> {
		const queryString = this.buildQueryString(params);
		const endpoint = path ? `${path}${queryString}` : `${queryString}`;
		return this.makeRequest<ApiResponse<T[]>>('GET', endpoint, undefined, config, options);
	}

	/**
	 * GET - Lấy dữ liệu theo ID
	 */
	public async getById<T = any>(
		id: IUniqueId,
		params?: FilterObject,
		path?: string,
		config?: AxiosRequestConfig,
		options?: ServiceOptions
	): Promise<AxiosResponse<ApiResponse<T>>> {
		if (!id) throw new Error('ID không được để trống');
		const queryString = this.buildQueryString(params);
		const endpoint = path ? `${path}/${id}${queryString}` : `/${id}${queryString}`;
		return this.makeRequest<ApiResponse<T>>('GET', endpoint, undefined, config, options);
	}

	/**
	 * POST - Tạo mới dữ liệu
	 */
	public async create<T = any>(
		data: Partial<T>,
		path?: string,
		config?: AxiosRequestConfig,
		options?: ServiceOptions
	): Promise<AxiosResponse<ApiResponse<T>>> {
		if (!data) throw new Error('Dữ liệu không được để trống');
		const endpoint = path || '';
		return this.makeRequest<ApiResponse<T>>('POST', endpoint, data, config, { ...options });
	}

	/**
	 * PUT - Cập nhật dữ liệu
	 */
	public async update<T = any>(
		id: IUniqueId,
		data: Partial<T>,
		path?: string,
		config?: AxiosRequestConfig,
		options?: ServiceOptions
	): Promise<AxiosResponse<ApiResponse<T>>> {
		if (!id) throw new Error('ID không được để trống');
		if (!data) throw new Error('Dữ liệu không được để trống');
		const endpoint = path ? `${path}/${id}` : `/${id}`;
		return this.makeRequest<ApiResponse<T>>('PUT', endpoint, data, config, { ...options });
	}

	/**
	 * DELETE - Xóa dữ liệu
	 */
	public async delete(id: IUniqueId, path?: string, config?: AxiosRequestConfig, options?: ServiceOptions): Promise<AxiosResponse<ApiResponse<boolean>>> {
		if (!id) throw new Error('ID không được để trống');
		const endpoint = path ? `${path}/${id}` : `/${id}`;
		return this.makeRequest<ApiResponse<boolean>>('DELETE', endpoint, undefined, config, options);
	}

	/**
	 * DELETE - Xóa dữ liệu với payload
	 */
	public async deleteWithPayload(
		payload: any,
		path?: string,
		config?: AxiosRequestConfig,
		options?: ServiceOptions
	): Promise<AxiosResponse<ApiResponse<boolean>>> {
		const endpoint = path ? `${path}` : ``;
		return this.makeRequest<ApiResponse<boolean>>('DELETE', endpoint, payload, config, options);
	}

	/**
	 * POST - Upload file
	 */
	public async uploadFile<T = any>(
		endpoint: string,
		file: File | FormData,
		config?: AxiosRequestConfig,
		options?: ServiceOptions
	): Promise<AxiosResponse<ApiResponse<T>>> {
		const formData = file instanceof FormData ? file : new FormData();
		if (file instanceof File) {
			formData.append('file', file);
		}

		return this.makeRequest<ApiResponse<T>>(
			'POST',
			endpoint,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				...config
			},
			{ ...options }
		);
	}

	/**
	 * Helper method để validate dữ liệu
	 */
	protected validateRequired(data: any, fields: string[]): void {
		const missingFields = fields.filter((field) => !data[field]);
		if (missingFields.length > 0) {
			throw new Error(`Các trường sau là bắt buộc: ${missingFields.join(', ')}`);
		}
	}
}
