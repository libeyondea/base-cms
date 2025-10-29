import { useMemo } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AccessControl } from './guards';
import { RoutesConfig } from './types';
import { generateRoutes } from './utils';

export interface RoutesProps {
	/**
	 * Custom routes configuration
	 */
	config: RoutesConfig;
	/**
	 * Router basename
	 */
	basename?: string;
	/**
	 * Profile API
	 */
	profileAPI?: string;
	/**
	 * Custom redirect path for private routes when user is not authenticated
	 * Default: '/signin'
	 */
	redirectPrivateTo?: string;
	/**
	 * Custom redirect path for auth routes when user is already authenticated
	 * Default: '/'
	 */
	redirectAuthTo?: string;
	/**
	 * Key data for profile API
	 * Default: 'data'
	 */
	keyData?: string;
}

export const Routes = ({ config, basename, profileAPI, redirectPrivateTo, redirectAuthTo, keyData }: RoutesProps) => {
	const router = useMemo(() => {
		const routes = generateRoutes(config, { redirectPrivateTo, redirectAuthTo });
		return createBrowserRouter(routes, { basename });
	}, [config, basename, redirectPrivateTo, redirectAuthTo]);

	return (
		<AccessControl profileAPI={profileAPI} keyData={keyData}>
			<RouterProvider router={router} />
		</AccessControl>
	);
};

export * from './types';
export * from './utils';
export * from './guards';
