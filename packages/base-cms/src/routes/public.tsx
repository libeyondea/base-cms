import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

import PublicLayout from '~/layouts/public/PublicLayout';

const About = lazy(() => import('~/views/public/about'));
const Contact = lazy(() => import('~/views/public/contact'));

export const publicRoutes: RouteObject[] = [
	{
		path: '',
		element: <PublicLayout />,
		children: [
			{
				path: 'about',
				element: <About />
			},
			{
				path: 'contact',
				element: <Contact />
			}
		]
	}
];
