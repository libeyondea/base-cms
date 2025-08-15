import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import PrivateLayout from '../layouts/private/PrivateLayout';

const Dashboard = lazy(() => import('../views/private/dashboard'));
const User = lazy(() => import('../views/private/user'));

export const privateRoutes: RouteObject[] = [
	{
		path: '',
		element: <PrivateLayout />,
		children: [
			{
				index: true,
				element: <Dashboard />
			},
			{
				path: 'users',
				element: <User />
			}
		]
	}
];
