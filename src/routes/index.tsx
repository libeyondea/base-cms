import { lazy } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { authRoutes } from './auth';
import { AccessControl } from './guards';
import { privateRoutes } from './private';
import { publicRoutes } from './public';

const NotFound = lazy(() => import('../views/NotFound'));

const Routes = () => {
	const router = createBrowserRouter([
		...authRoutes,
		...privateRoutes,
		...publicRoutes,
		{
			path: '*',
			element: <NotFound />
		}
	]);

	return (
		<AccessControl>
			<RouterProvider router={router} />
		</AccessControl>
	);
};

export default Routes;
