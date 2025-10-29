import { lazy } from 'react';

import { Routes, RoutesConfig } from '@libeyondea/base-cms';

const PrivateLayout = lazy(() => import('~/layouts/private/PrivateLayout'));
const AuthLayout = lazy(() => import('~/layouts/auth/AuthLayout'));
const PublicLayout = lazy(() => import('~/layouts/public/PublicLayout'));

const Dashboard = lazy(() => import('~/views/private/dashboard'));
const SignIn = lazy(() => import('~/views/auth/signin'));
const SignUp = lazy(() => import('~/views/auth/signup'));
const User = lazy(() => import('~/views/private/user'));

const About = lazy(() => import('~/views/public/about'));
const Contact = lazy(() => import('~/views/public/contact'));

const Router = () => {
	const routesConfig: RoutesConfig = {
		auth: [
			{
				path: '',
				layout: AuthLayout,
				children: [
					{
						path: 'signin',
						element: SignIn
					},
					{
						path: 'signup',
						element: SignUp
					}
				]
			}
		],
		private: [
			{
				path: '',
				layout: PrivateLayout,
				children: [
					{
						index: true,
						element: Dashboard
					},
					{
						path: 'users',
						element: User
					}
				]
			}
		],
		public: [
			{
				path: '',
				layout: PublicLayout,
				children: [
					{
						path: 'about',
						element: About
					},
					{
						path: 'contact',
						element: Contact
					}
				]
			}
		]
	};

	return (
		<Routes
			config={routesConfig}
			// Custom redirect paths
			redirectPrivateTo="/signin" // Redirect to signin when accessing private routes without auth
			redirectAuthTo="/" // Redirect to dashboard when accessing auth routes while authenticated
		/>
	);
};

export default Router;
