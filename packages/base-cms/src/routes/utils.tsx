import { Suspense, lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { LoadingScreen } from '~/components/LoadingScreen';

import { AuthGuard, PrivateGuard } from './guards';
import { GuardType, ProcessedRoute, RouteConfig, RouteGroupConfig, RoutesConfig } from './types';

// Import NotFound mặc định
const DefaultNotFound = lazy(() => import('~/components/NotFound').then((module) => ({ default: module.NotFound })));

/**
 * Wrap component với guard tương ứng
 */
const wrapWithGuard = (element: React.ReactNode, guard?: GuardType): React.ReactNode => {
	switch (guard) {
		case 'private':
			return <PrivateGuard>{element}</PrivateGuard>;
		case 'auth':
			return <AuthGuard>{element}</AuthGuard>;
		case 'public':
		case 'none':
		default:
			return element;
	}
};

/**
 * Wrap component với Suspense và LoadingScreen
 */
const wrapWithSuspense = (element: React.ReactNode): React.ReactNode => {
	return <Suspense fallback={<LoadingScreen />}>{element}</Suspense>;
};

/**
 * Convert RouteConfig thành RouteObject
 */
export const convertRouteConfig = (config: RouteConfig, parentGuard?: GuardType, parentLayout?: any): ProcessedRoute => {
	const { path, element, guard, layout, children, index, meta, ...rest } = config;

	// Xác định guard type (ưu tiên của route, sau đó là của parent)
	const effectiveGuard = guard || parentGuard;

	// Xác định layout (ưu tiên của route, sau đó là của parent)
	const effectiveLayout = layout || parentLayout;

	// Tạo element với layout nếu có
	let routeElement: React.ReactNode = null;

	if (element) {
		// Nếu element là component, render nó
		// Luôn render dưới dạng JSX element vì có thể là lazy component hoặc normal component
		const Component = element as any;
		routeElement = <Component />;

		// Wrap với layout CHỈ KHI KHÔNG CÓ CHILDREN
		// Nếu có children, layout sẽ được render ở parent route
		if (effectiveLayout && !children) {
			const Layout = effectiveLayout;
			routeElement = <Layout>{routeElement}</Layout>;
		}

		// Wrap với guard
		routeElement = wrapWithGuard(routeElement, effectiveGuard);

		// Wrap với Suspense
		routeElement = wrapWithSuspense(routeElement);
	} else if (layout && children) {
		// Nếu KHÔNG CÓ element nhưng CÓ layout và children
		// => Đây là parent route, render layout với guard
		// Layout phải có <Outlet /> để render children
		const Layout = layout;
		routeElement = wrapWithGuard(wrapWithSuspense(<Layout />), effectiveGuard);
	}

	// Convert children routes
	// QUAN TRỌNG: Children KHÔNG inherit layout từ parent
	// Vì layout đã được render ở parent route rồi
	const childRoutes = children?.map((child) => convertRouteConfig(child, effectiveGuard, undefined));

	// Build route object - React Router không cho phép index route có children
	if (index) {
		return {
			index: true,
			...(routeElement && { element: routeElement }),
			...rest
		} as ProcessedRoute;
	}

	return {
		...(path !== undefined && { path }),
		...(routeElement && { element: routeElement }),
		...(childRoutes && childRoutes.length > 0 && { children: childRoutes }),
		...rest
	} as ProcessedRoute;
};

/**
 * Convert RouteGroupConfig thành array RouteObject
 */
export const convertRouteGroupConfig = (groupConfig: RouteGroupConfig): ProcessedRoute[] => {
	const { layout, guard, prefix, routes } = groupConfig;

	// Nếu có prefix, wrap tất cả routes trong một parent route
	if (prefix) {
		return [
			{
				path: prefix,
				children: routes.map((route) => convertRouteConfig(route, guard, layout))
			}
		];
	}

	// Nếu không có prefix, convert từng route
	return routes.map((route) => convertRouteConfig(route, guard, layout));
};

/**
 * Generate routes từ RoutesConfig
 */
export const generateRoutes = (config: RoutesConfig): ProcessedRoute[] => {
	const routes: ProcessedRoute[] = [];

	// Auth routes
	if (config.auth && config.auth.length > 0) {
		routes.push(
			...config.auth.map((route) =>
				convertRouteConfig(
					route,
					route.guard || 'auth', // Default guard cho auth routes là 'auth'
					route.layout
				)
			)
		);
	}

	// Private routes
	if (config.private && config.private.length > 0) {
		routes.push(
			...config.private.map((route) =>
				convertRouteConfig(
					route,
					route.guard || 'private', // Default guard cho private routes là 'private'
					route.layout
				)
			)
		);
	}

	// Public routes
	if (config.public && config.public.length > 0) {
		routes.push(
			...config.public.map((route) =>
				convertRouteConfig(
					route,
					route.guard || 'public', // Default guard cho public routes là 'public'
					route.layout
				)
			)
		);
	}

	// Custom route groups
	if (config.groups && config.groups.length > 0) {
		config.groups.forEach((group) => {
			routes.push(...convertRouteGroupConfig(group));
		});
	}

	// Not Found route - sử dụng NotFound mặc định nếu không được cung cấp
	const NotFoundComponent = config.notFound || DefaultNotFound;
	routes.push({
		path: '*',
		element: wrapWithSuspense(<NotFoundComponent />)
	});

	return routes;
};

/**
 * Helper để tạo lazy route
 */
export const createLazyRoute = (importFn: () => Promise<{ default: any }>) => {
	return lazy(importFn);
};
