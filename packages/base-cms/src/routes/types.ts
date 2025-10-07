import { ComponentType, LazyExoticComponent, ReactElement } from 'react';

import { RouteObject } from 'react-router-dom';

/**
 * Guard types cho route protection
 */
export type GuardType = 'private' | 'auth' | 'public' | 'none';

/**
 * Route configuration cho người dùng
 */
export interface RouteConfig {
	/** Đường dẫn của route - không bắt buộc nếu là index route */
	path?: string;

	/** Component để render - có thể là lazy hoặc normal component */
	element?: ComponentType<any> | LazyExoticComponent<ComponentType<any>> | ReactElement;

	/** Guard type - mặc định là 'none' */
	guard?: GuardType;

	/** Layout wrapper cho route này */
	layout?: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;

	/** Children routes */
	children?: RouteConfig[];

	/** Route index - nếu true thì path sẽ bị ignore */
	index?: boolean;

	/** Metadata cho route */
	meta?: {
		title?: string;
		icon?: any;
		[key: string]: any;
	};
}

/**
 * Route group configuration - nhóm các routes cùng layout và guard
 */
export interface RouteGroupConfig {
	/** Layout chung cho tất cả routes trong group */
	layout?: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;

	/** Guard type chung cho tất cả routes trong group */
	guard?: GuardType;

	/** Prefix path cho tất cả routes trong group */
	prefix?: string;

	/** Routes trong group */
	routes: RouteConfig[];
}

/**
 * Main configuration object cho routes
 */
export interface RoutesConfig {
	/** Auth routes (signin, signup, ...) */
	auth?: RouteConfig[];

	/** Private routes (cần đăng nhập) */
	private?: RouteConfig[];

	/** Public routes (không cần đăng nhập) */
	public?: RouteConfig[];

	/** Custom route groups */
	groups?: RouteGroupConfig[];

	/** 404 Not Found component - optional, sẽ sử dụng trang NotFound mặc định nếu không được cung cấp */
	notFound?: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;

	/** Error component */
	error?: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;

	/** Base path cho toàn bộ routes */
	basePath?: string;
}

/**
 * Route object đã được xử lý
 */
export type ProcessedRoute = RouteObject;
