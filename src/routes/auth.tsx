import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

const AuthLayout = lazy(() => import('../layouts/auth/AuthLayout'));

const SignIn = lazy(() => import('../views/auth/signin'));
const SignUp = lazy(() => import('../views/auth/signup'));

export const authRoutes: RouteObject[] = [
	{
		path: 'auth',
		element: <AuthLayout />,
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
