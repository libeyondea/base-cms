import { useMemo } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AccessControl } from './guards';
import { RoutesConfig } from './types';
import { generateRoutes } from './utils';

interface RoutesProps {
	/**
	 * Custom routes configuration
	 */
	config: RoutesConfig;
	/**
	 * Router basename
	 */
	basename?: string;
	/**
	 * Profile URL
	 */
	profileUrl?: string;
}

export const Routes = ({ config, basename, profileUrl }: RoutesProps) => {
	const router = useMemo(() => {
		const routes = generateRoutes(config);
		return createBrowserRouter(routes, { basename });
	}, [config, basename]);

	return (
		<AccessControl profileUrl={profileUrl}>
			<RouterProvider router={router} />
		</AccessControl>
	);
};

export * from './types';
export * from './utils';
export * from './guards';
