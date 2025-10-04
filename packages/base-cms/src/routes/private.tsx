import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import PrivateLayout from '~/layouts/private/PrivateLayout';

import { PrivateGuard } from './guards';

const Dashboard = lazy(() => import('~/views/private/dashboard'));
const User = lazy(() => import('~/views/private/user'));

export const privateRoutes: RouteObject[] = [
	{
		path: '',
		element: (
			<PrivateGuard>
				<PrivateLayout />
			</PrivateGuard>
		),
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
