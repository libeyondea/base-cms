import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import { AuthGuard } from './guards';

const AuthLayout = lazy(() => import('~/layouts/auth/AuthLayout'));

const SignIn = lazy(() => import('~/views/auth/signin'));
const SignUp = lazy(() => import('~/views/auth/signup'));

export const authRoutes: RouteObject[] = [
	{
		path: '',
		element: (
			<AuthGuard>
				<AuthLayout />
			</AuthGuard>
		),
		children: [
			{
				path: 'signin',
				element: <SignIn />
			},
			{
				path: 'signup',
				element: <SignUp />
			}
		]
	}
];
